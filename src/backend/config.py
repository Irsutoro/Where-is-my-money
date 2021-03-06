import cherrypy
import psycopg2
from cherrypy.lib import auth_basic
from database_repository import Database, ResultSet, WMM_MAIN_DB

def validate_password(realm, username, password):
    query = 'SELECT EXISTS (SELECT * FROM users WHERE login = %s AND password ILIKE %s)'
    with WMM_MAIN_DB as db:
        result = db.execute(query, (username, password), ResultSet.ONE)
    if result is None or not result[0]:
        return False
    else:
        return True


CHERRYPY_CONFIG_DEFAULT = {
    'server.socket_host': '127.0.0.1',
    'server.socket_port': 8080,
    'tools.auth_basic.on': True,
    'tools.auth_basic.realm': '127.0.0.1',
    'tools.auth_basic.checkpassword': validate_password,
}

WITHOUT_AUTHENTICATION = {'/': {'request.dispatch': cherrypy.dispatch.MethodDispatcher(), 'tools.auth_basic.on': False}}
WITH_AUTHENTICATION = {'/': {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}}