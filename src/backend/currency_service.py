import cherrypy
from database_repository import WMM_MAIN_DB
from database_management import ResultSet
from typing import List, Dict, Union

@cherrypy.expose
class CurrencyService:

    @cherrypy.tools.json_out()
    def GET(self) -> List[Dict[str,Union[str,int]]] :
        currencies = self._get_currency_list()
        return currencies


    def _get_currency_list(self) -> None:
        query = 'SELECT id, fullname, code FROM currencies'
        with WMM_MAIN_DB as db:
            currencies = db.execute(query, (), ResultSet.ALL)
        result = []
        for currency in currencies:
            result.append({'id': currency[0], 'fullname': currency[1], 'code': currency[2]})
        return result