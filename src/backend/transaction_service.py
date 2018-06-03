import cherrypy
from config import CHERRYPY_CONFIG_DEFAULT, WITH_AUTHENTICATION
from database_repository import WMM_MAIN_DB, QUERIES
from database_management import ResultSet


@cherrypy.expose
class TransactionService:

    @cherrypy.tools.json_out()
    def GET(self, time_to=None, time_from=None, subaccount_id=None, category_id=None):
        query = QUERIES['Transaction']['List']
        with WMM_MAIN_DB as db:
            user_id = db.execute(QUERIES['General']['UserId'], (cherrypy.request.login,), ResultSet.ONE)[0]
            parameters = (user_id,)
            if time_to:
                query += ' AND date <= %s'
                parameters += (int(time_to),)
            if time_from:
                query += ' AND date >= %s'
                parameters += (int(time_from),)
            if subaccount_id:
                query += ' AND subaccount_id = %s'
                parameters += (int(subaccount_id),)
            if category_id:
                query += ' AND category_id = %s'
                parameters += (int(category_id),)

            data = db.execute(query,parameters,ResultSet.ALL)
            result = []
            for d in data:
                result.append({
                    'id': d[0],
                    'date': d[1],
                    'amount': d[2],
                    'comment': d[3],
                    'category': d[4],
                    'subaccount': d[5],
                    'currency': d[6],
                })
        return result

    @cherrypy.tools.json_in()
    def POST(self):
        request = cherrypy.request.json
        with WMM_MAIN_DB as db:
            try:
                user_id = db.execute(QUERIES['General']['UserId'], (cherrypy.request.login,), ResultSet.ONE)[0]
                if db.execute(QUERIES['Transaction']['Authorize'], (user_id, request['subaccount_id'], request['category_id']), ResultSet.ONE)[0]:
                    db.execute(QUERIES['Transaction']['New'], (user_id, request['category_id'],
                                                                request['subaccount_id'], request['currency_id'],
                                                                request['date'], request['amount'],
                                                                request.get('comment', None)), ResultSet.NONE)
                else:
                    raise cherrypy.HTTPError(401, 'Unauthorized')
            except (KeyError, TypeError):
                raise cherrypy.HTTPError(400, 'Bad Request')

    @cherrypy.tools.json_in()
    def PUT(self, id):
        request = cherrypy.request.json
        with WMM_MAIN_DB as db:
            try:
                user_id = db.execute(QUERIES['General']['UserId'], (cherrypy.request.login,), ResultSet.ONE)[0]
                if db.execute(QUERIES['Transaction']['Authorize'], (user_id, request['subaccount_id'], request['category_id']), ResultSet.ONE)[0]:
                    updated = db.execute(QUERIES['Transaction']['Update'], (request['category_id'], request['subaccount_id'],
                                                                            request['currency_id'], request['date'],
                                                                            request['amount'], request['comment'], id, user_id), ResultSet.ONE)
                    if not updated:
                        raise cherrypy.HTTPError(404, 'Entry not found')
                else:
                    raise cherrypy.HTTPError(401, 'Unauthorized')
            except (KeyError, TypeError):
                raise cherrypy.HTTPError(400, 'Bad Request')

    def DELETE(self, id):
        request = cherrypy.request.json
        with WMM_MAIN_DB as db:
            user_id = db.execute(QUERIES['General']['UserId'], (cherrypy.request.login,), ResultSet.ONE)[0]
            deleted = db.execute(QUERIES['Transaction']['Delete'], (user_id, id), ResultSet.ONE)
            if not deleted:
                raise cherrypy.HTTPError(404, 'Entry not found')
