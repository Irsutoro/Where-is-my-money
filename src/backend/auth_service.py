import json
import random
import string
from base64 import b64encode
from datetime import datetime

import cherrypy
import psycopg2

from config import CHERRYPY_CONFIG_DEFAULT, WITHOUT_AUTHENTICATION
from database_management import ResultSet
from database_repository import (ACTIVATE_USER_ACCOUNT, CHECK_IF_USER_EXISTS,
                                REGISTER_USER, TOKEN_LENGTH, WMM_MAIN_DB)


@cherrypy.expose
class AuthService:

    def GET(self, login, password):
        with WMM_MAIN_DB:
            try:
                user_id = WMM_MAIN_DB.execute(CHECK_IF_USER_EXISTS, (login, password), ResultSet.ONE)[0]
                auth_token = b64encode(bytes(f'{login}:{password}', 'utf-8')).decode("utf-8")
                response = {'id': user_id, 'authorization': auth_token}
                return json.dumps(response)
                
            except TypeError:
                raise cherrypy.HTTPError(403, "UNAUTHORIZED")

    def POST(self):
        with WMM_MAIN_DB:
            try:
                request = json.loads(cherrypy.request.body.read().decode('UTF-8'))
                token = ''.join(random.choices(string.ascii_uppercase + string.digits, k=TOKEN_LENGTH))
                WMM_MAIN_DB.execute(REGISTER_USER, (request['login'], request['password'].lower(), request['email'], request['username'], datetime.now(), token), ResultSet.NONE)
            except psycopg2.IntegrityError:
                raise cherrypy.HTTPError(422, "USER WITH THIS LOGIN OR EMAIL ALREADY EXISTS")
            except (KeyError, TypeError):
                raise cherrypy.HTTPError(400, "BAD REQUEST")
            except json.decoder.JSONDecodeError:
                raise cherrypy.HTTPError(404, "REQUEST NOT FOUND")
        
    def PUT(self, token):
        with WMM_MAIN_DB:
            changed = WMM_MAIN_DB.execute(ACTIVATE_USER_ACCOUNT, (token,), ResultSet.ONE)
            if changed is None:
                raise cherrypy.HTTPError(404, "USER WITH THIS TOKEN NOT FOUND")
            
        
        


if __name__ == '__main__':
    cherrypy.config.update(CHERRYPY_CONFIG_DEFAULT)
    cherrypy.quickstart(AuthService(), '/api/auth', WITHOUT_AUTHENTICATION)
