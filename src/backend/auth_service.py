import random
import string
from base64 import b64encode

import cherrypy
import psycopg2

from config import CHERRYPY_CONFIG_DEFAULT, WITHOUT_AUTHENTICATION, EMAIL_PASS, EMAIL_SENDER, EMAIL_SERVER, EMAIL_PORT
from database_management import ResultSet
from database_repository import WMM_MAIN_DB, QUERIES, TOKEN_LENGTH

import smtplib
from email.message import EmailMessage

@cherrypy.expose
class AuthService:

    @cherrypy.tools.json_out()
    def GET(self, login, password):
        with WMM_MAIN_DB as db:
            user_exists = db.execute(QUERIES['Auth']['ValidateUser'], (login, password), ResultSet.ONE)[0]
            if user_exists:
                auth_token = b64encode(bytes(f'{login}:{password}', 'utf-8')).decode('utf-8')
                return {'auth_token': auth_token}
            else:
                raise cherrypy.HTTPError(404, 'User not found')

    @cherrypy.tools.json_in()
    def POST(self):
        with WMM_MAIN_DB as db:
            try:
                request = cherrypy.request.json
                token = ''.join(random.choices(string.ascii_uppercase + string.digits, k=TOKEN_LENGTH))
                id = db.execute(QUERIES['Auth']['Register'], (request['login'], request['password'].upper(), request['email'], request['username']), ResultSet.ONE)
                db.execute(QUERIES['Auth']['AssignActivationToken'], (id, token), ResultSet.NONE)
            except psycopg2.IntegrityError:
                raise cherrypy.HTTPError(422, "User with this login or email already exists")
            except (KeyError, TypeError):
                raise cherrypy.HTTPError(400, "Bad request")

        msg = EmailMessage()
        msg.set_content('Token aktywacyjny: ' + token)
        msg['Subject'] = 'Aktywacja konta w serwisie Where is my Money?!'
        msg['From'] = EMAIL_SENDER
        msg['To'] = request['email']

        server = smtplib.SMTP(EMAIL_SERVER, EMAIL_PORT)
        server.ehlo()
        server.starttls()
        server.login(EMAIL_SENDER, EMAIL_PASS)
        server.send_message(msg)



    @cherrypy.tools.json_out()
    def PUT(self, token):
        with WMM_MAIN_DB as db:
            try:
                activated_login = db.execute(QUERIES['Auth']['ActivateAccount'], (token,), ResultSet.ONE)[0]
                db.execute(QUERIES['General']['DeactivateToken'], (token,), ResultSet.NONE)
                return {'activated_login': activated_login}
            except TypeError:
                raise cherrypy.HTTPError(404, 'User with this token not found')


if __name__ == '__main__':
    cherrypy.config.update(CHERRYPY_CONFIG_DEFAULT)
    cherrypy.quickstart(AuthService(), '/api/auth', WITHOUT_AUTHENTICATION)
