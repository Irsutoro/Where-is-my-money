import cherrypy
from config import CHERRYPY_CONFIG_DEFAULT, WITH_AUTHENTICATION
from base64 import b64decode
from database_repository import WMM_MAIN_DB, QUERIES
from database_management import ResultSet

@cherrypy.expose
class UserService:

    @cherrypy.tools.json_out()
    def GET(self):
        with WMM_MAIN_DB as db:
            user_info = db.execute(QUERIES['User']['Info'], (cherrypy.request.login,), ResultSet.ONE)
            return {'email': user_info[0], 'username': user_info[1], 'registration_date': str(user_info[2])}

    @cherrypy.tools.json_in()
    def PUT(self):
        request = cherrypy.request.json
        with WMM_MAIN_DB as db:
            db.execute(QUERIES['User']['Update'], (request['password'].upper(), request['email'], request['username'], cherrypy.request.login), ResultSet.NONE)

    def DELETE(self):
        with WMM_MAIN_DB as db:
            db.execute(QUERIES['User']['Delete'], (cherrypy.request.login,), ResultSet.NONE)




if __name__ == '__main__':
    cherrypy.config.update(CHERRYPY_CONFIG_DEFAULT)
    cherrypy.quickstart(UserService(), '/api/user', WITH_AUTHENTICATION)
