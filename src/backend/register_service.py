import cherrypy
from config import CHERRYPY_CONFIG_DEFAULT, WITHOUT_AUTHENTICATION
from database_repository import WMM_MAIN_DB, REGISTER_USER, ACTIVATE_USER_ACCOUNT, TOKEN_LENGTH
from database_management import ResultSet
import json
import psycopg2
from datetime import datetime
import string
import random


@cherrypy.expose
class RegisterService:

    def POST(self):
        request = json.loads(cherrypy.request.body.read().decode('UTF-8'))
        if request is not None:
            if request.get('login') is not None and request.get('password') is not None and \
                request.get('email') is not None and request.get('username') is not None:
                with WMM_MAIN_DB:
                    try:
                        token = ''.join(random.choices(string.ascii_uppercase + string.digits, k=TOKEN_LENGTH))
                        WMM_MAIN_DB.execute(REGISTER_USER, (request['login'], request['password'].lower(), request['email'], request['username'], datetime.now(), token), ResultSet.NONE)
                    except psycopg2.IntegrityError:
                        raise cherrypy.HTTPError(422, "USER WITH THIS LOGIN OR EMAIL ALREADY EXISTS")
        
    def PUT(self, token):
        with WMM_MAIN_DB:
            changed = WMM_MAIN_DB.execute(ACTIVATE_USER_ACCOUNT, (token,), ResultSet.ONE)
            if changed is None:
                raise cherrypy.HTTPError(404, "USER WITH THIS TOKEN NOT FOUND")
            
        
        


if __name__ == '__main__':
    cherrypy.config.update(CHERRYPY_CONFIG_DEFAULT)
    cherrypy.quickstart(RegisterService(), '/register', WITHOUT_AUTHENTICATION)