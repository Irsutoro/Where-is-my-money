import cherrypy
import psycopg2
from cherrypy.lib import auth_basic
from database_repository import QUERIES, Database, ResultSet, WMM_MAIN_DB

EMAIL_SENDER = 'email'
EMAIL_PASS = 'pass'
EMAIL_SERVER = 'smtp.gmail.com'
EMAIL_PORT = 587

def validate_password(realm, username, password):
    with WMM_MAIN_DB as db:
        result = db.execute(QUERIES['Auth']['ValidateUser'], (username, password), ResultSet.ONE)
        if result is None or not result[0]:
            return False
        else:
            return True

CHERRYPY_CONFIG_DEFAULT = {
    'server.socket_host': '10.0.2.15',
    'server.socket_port': 8080,
    'tools.auth_basic.on': True,
    'tools.auth_basic.realm': '10.0.2.15',
    'tools.auth_basic.checkpassword': validate_password,
}

WITHOUT_AUTHENTICATION = {'/': {'request.dispatch': cherrypy.dispatch.MethodDispatcher(), 'tools.auth_basic.on': False}}
WITH_AUTHENTICATION = {'/': {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}}