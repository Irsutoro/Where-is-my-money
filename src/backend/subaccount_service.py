import cherrypy
from config import CHERRYPY_CONFIG_DEFAULT, WITH_AUTHENTICATION
from base64 import b64decode
from database_repository import WMM_MAIN_DB, QUERIES
from database_management import ResultSet

@cherrypy.expose
class SubaccountService:

    @cherrypy.tools.json_out()
    def GET(self):
        with WMM_MAIN_DB as db:
            user_id = db.execute(QUERIES['General']['UserId'], (cherrypy.request.login,), ResultSet.ONE)[0]
            subaccount_list = db.execute(QUERIES['Subaccount']['List'], (user_id,), ResultSet.ALL)
            return [{'id': id, 'name': name} for id, name in subaccount_list]

    @cherrypy.tools.json_in()
    def POST(self):
        with WMM_MAIN_DB as db:
            request = cherrypy.request.json
            user_id = db.execute(QUERIES['General']['UserId'], (cherrypy.request.login,), ResultSet.ONE)[0]
            try:
                db.execute(QUERIES['Subaccount']['New'], (user_id, request['name']), ResultSet.NONE)
            except (KeyError, TypeError):
                raise cherrypy.HTTPError(400, "Bad request")

    @cherrypy.tools.json_in()
    def PUT(self, id):
        with WMM_MAIN_DB as db:
            request = cherrypy.request.json
            user_id = db.execute(QUERIES['General']['UserId'], (cherrypy.request.login,), ResultSet.ONE)[0]
            try:
                db.execute(QUERIES['Subaccount']['Update'], (request['name'], id, user_id), ResultSet.NONE)
            except (KeyError, TypeError):
                raise cherrypy.HTTPError(400, "Bad request")

    def DELETE(self, id):
        with WMM_MAIN_DB as db:
            user_id = db.execute(QUERIES['General']['UserId'], (cherrypy.request.login,), ResultSet.ONE)[0]
            db.execute(QUERIES['Subaccount']['Delete'], (id, user_id), ResultSet.NONE)


if __name__ == '__main__':
    cherrypy.config.update(CHERRYPY_CONFIG_DEFAULT)
    cherrypy.quickstart(SubaccountService(), '/api/subaccounts', WITH_AUTHENTICATION)