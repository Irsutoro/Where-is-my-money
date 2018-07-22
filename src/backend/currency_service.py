import cherrypy
from database_repository import WMM_MAIN_DB, QUERIES
from database_management import ResultSet

@cherrypy.expose
class CurrencyService:

    @cherrypy.tools.json_out()
    def GET(self):
        with WMM_MAIN_DB as db:
            currencies = db.execute(QUERIES['Currency']['List'], (), ResultSet.ALL)
        result = []
        for currency in currencies:
            result.append({'id': currency[0], 'fullname': currency[1], 'code': currency[2]})
        return result