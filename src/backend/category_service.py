import cherrypy
from config import CHERRYPY_CONFIG_DEFAULT, WITH_AUTHENTICATION
from base64 import b64decode
from database_repository import WMM_MAIN_DB, QUERIES
from database_management import ResultSet

@cherrypy.expose
class CategoryService:

    @cherrypy.tools.json_out()
    def GET(self):
        with WMM_MAIN_DB as db:
            user_id = db.execute(QUERIES['General']['UserId'], (cherrypy.request.login,), ResultSet.ONE)[0]
            category_list = db.execute(QUERIES['Category']['List'], (user_id,), ResultSet.ALL)
            return [{'id': id, 'name': name} for id, name in category_list]

    @cherrypy.tools.json_in()
    def POST(self):
        with WMM_MAIN_DB as db:
            request = cherrypy.request.json
            user_id = db.execute(QUERIES['General']['UserId'], (cherrypy.request.login,), ResultSet.ONE)[0]
            try:
                db.execute(QUERIES['Category']['New'], (user_id, request['name']), ResultSet.NONE)
            except (KeyError, TypeError):
                raise cherrypy.HTTPError(400, "Bad request")

    @cherrypy.tools.json_in()
    def PUT(self, id):
        with WMM_MAIN_DB as db:
            request = cherrypy.request.json
            user_id = db.execute(QUERIES['General']['UserId'], (cherrypy.request.login,), ResultSet.ONE)[0]
            try:
                updated = db.execute(QUERIES['Category']['Update'], (request['name'], id, user_id), ResultSet.ONE)
                if not updated:
                    raise cherrypy.HTTPError(404, 'Category not found')
            except (KeyError, TypeError):
                raise cherrypy.HTTPError(400, "Bad request")

    def DELETE(self, id):
        with WMM_MAIN_DB as db:
            user_id = db.execute(QUERIES['General']['UserId'], (cherrypy.request.login,), ResultSet.ONE)[0]
            deleted = db.execute(QUERIES['Category']['Delete'], (id, user_id), ResultSet.NONE)
            if not deleted:
                    raise cherrypy.HTTPError(404, 'Category not found')


if __name__ == '__main__':
    cherrypy.config.update(CHERRYPY_CONFIG_DEFAULT)
    cherrypy.quickstart(CategoryService(), '/api/categories', WITH_AUTHENTICATION)