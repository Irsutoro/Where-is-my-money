import random
import string
from base64 import b64encode
import json
import cherrypy
import psycopg2
from typing import Dict
import configparser
from config import CHERRYPY_CONFIG_DEFAULT, WITHOUT_AUTHENTICATION
from database_management import ResultSet
from database_repository import WMM_MAIN_DB

import smtplib
from email.message import EmailMessage

ACTIVATION_TOKEN_CATEGORY_ID = 1

@cherrypy.expose
class AuthService:

    @cherrypy.tools.json_out()
    def GET(self, login: str, password: str) -> Dict[str, str]:
        if self._user_exists(login, password):
            auth_token = self._generate_auth_token(login, password)
            return {'auth_token': auth_token}
        else:
            raise cherrypy.HTTPError(404, 'User not found')

    def _generate_auth_token(self, login: str, password: str) -> str:
        auth_token = b64encode(bytes(f'{login}:{password}', 'utf-8')).decode('utf-8')
        return auth_token

    def _user_exists(self, login: str, password: str) -> bool:
        query = 'SELECT EXISTS (SELECT * FROM users WHERE login = %s AND password ILIKE %s)'
        with WMM_MAIN_DB as db:
            user_exists = db.execute(query, (login, password), ResultSet.ONE)[0]
        return True if user_exists else False

    @cherrypy.tools.json_in()
    def POST(self) -> None:
        request = cherrypy.request.json
        user_id = self._register_user(request['login'], request['password'].upper(), request['email'], request['username'])
        token = self._generate_activation_token()
        self._assign_activation_token(token, user_id)
        self._send_activation_email(request['email'], token, request['login'])

    def _generate_activation_token(self) -> None:
        TOKEN_LENGTH = 30
        CHARACTER_POOL = string.ascii_uppercase + string.digits
        token = ''.join(random.choices(CHARACTER_POOL, k=TOKEN_LENGTH))
        return token

    def _register_user(self, login: str, password: str, email: str, username: str) -> int:
        query = 'INSERT INTO users (login, password, email, username, registration_date) VALUES (%s, %s, %s, %s, current_date) RETURNING id'
        if len(password) != 64:
            raise cherrypy.HTTPError(400, "Bad request")
        with WMM_MAIN_DB as db:
            try:
                user_id = db.execute(query, (login, password, email, username), ResultSet.ONE)[0]
            except psycopg2.IntegrityError:
                raise cherrypy.HTTPError(422, "User with this login or email already exists")
            except (KeyError, TypeError):
                raise cherrypy.HTTPError(400, "Bad request")
        return user_id

    def _assign_activation_token(self, token: str, user_id: int) -> None:
        expiration_date = "current_date + interval '1 week'"
        query = f'INSERT INTO tokens (user_id, token_category_id, expiration_date, value) VALUES (%s, {ACTIVATION_TOKEN_CATEGORY_ID}, {expiration_date}, %s)'
        with WMM_MAIN_DB as db:
            user_id = db.execute(query, (user_id, token), ResultSet.NONE)

    def _send_activation_email(self, email: str, token: str, login: str) -> None:
        CONFIG_FILE = 'email.config'
        config = self._read_email_config(CONFIG_FILE)

        message_content = f"""Email aktywacyjny dla konta o loginie {login} w serwisie Where is my Money?!\n
        \n
        Jeśli nie zakładałeś konta w serwisie możesz zignorować ten email. \n
        \n
        Aby aktywować konto kliknij w odnośnik: http://iraminius.pl/wmm/activate?token={token}
        """
        msg = EmailMessage()
        msg.set_content(message_content)
        msg['Subject'] = 'Aktywacja konta w serwisie Where is my Money?!'
        msg['From'] = config['Email']['Address']
        msg['To'] = email

        server = smtplib.SMTP(config['Server']['Host'], config['Server']['Port'])
        server.ehlo()
        server.starttls()
        server.login(config['Email']['Address'], config['Email']['Password'])
        server.send_message(msg)

    def _read_email_config(self, file_name: str) -> Dict[str, str]:
        config = configparser.ConfigParser()
        config.read(file_name)
        return config

    @cherrypy.tools.json_out()
    def PUT(self, token: str) -> Dict[str, str]:
        activated_login = self._activate_account(token)
        self._deactivate_token(token)
        return {'activated_login': activated_login}

    def _activate_account(self, token: str) -> None:
        query = f'UPDATE users SET is_activated = TRUE WHERE id IN (SELECT user_id FROM tokens WHERE value ilike %s AND token_category_id = {ACTIVATION_TOKEN_CATEGORY_ID} and current_date < expiration_date) RETURNING login'
        with WMM_MAIN_DB as db:
            activated_login = db.execute(query, (token,), ResultSet.ONE)
        if activated_login:
            return activated_login[0]
        else:
            raise cherrypy.HTTPError(404, 'User with this token not found')

    def _deactivate_token(self, token: str) -> None:
        query = 'UPDATE tokens SET expiration_date = current_date WHERE value = %s'
        with WMM_MAIN_DB as db:
            db.execute(query, (token,), ResultSet.NONE)