import cherrypy
from config import CHERRYPY_CONFIG_DEFAULT, WITH_AUTHENTICATION
from base64 import b64decode
from database_repository import WMM_MAIN_DB
from database_management import ResultSet
from typing import List, Dict, Union

@cherrypy.expose
class SubaccountService:

    @cherrypy.tools.json_out()
    def GET(self) -> List[Dict[str, Union[str, int]]]:
        user_id = self._get_user_id(cherrypy.request.login)
        subaccounts = self._get_subaccounts(user_id)
        return subaccounts

    def _get_user_id(self, login: str) -> int:
        query = 'SELECT id FROM users WHERE login = %s'
        with WMM_MAIN_DB as db:
            user_id = db.execute(query, (login,), ResultSet.ONE)[0]
        return user_id

    def _get_subaccounts(self, user_id: int) -> List[Dict[str, Union[str, int]]]:
        query = 'SELECT id, name, code, description FROM subaccounts JOIN currencies c on c.id = currency_id WHERE user_id = %s'
        with WMM_MAIN_DB as db:
            subaccounts = db.execute(query, (user_id,), ResultSet.ALL)
        return [{'id': id, 'name': name, 'currency': currency, 'description': description} for id, name, currency, description in subaccounts]

    @cherrypy.tools.json_in()
    def POST(self) -> None:
        request = cherrypy.request.json
        user_id = self._get_user_id(cherrypy.request.login)
        try:
            self._create_subaccount(user_id, request['name'], request['currency_id'], request.get('description'))
        except (KeyError, TypeError):
            raise cherrypy.HTTPError(400, "Bad request")

    def _create_subaccount(self, user_id: int, name: str, currency_id: int, description: str) -> None:
        query = 'INSERT INTO subaccounts (user_id, name, currency_id, description) VALUES (%s, %s, %s, %s)'
        with WMM_MAIN_DB as db:
            db.execute(query, (user_id, name, currency_id, description), ResultSet.NONE)

    @cherrypy.tools.json_in()
    def PUT(self, id: int) -> None:
        request = cherrypy.request.json
        user_id = self._get_user_id(cherrypy.request.login)

        name = request.get('name')
        if name:
            self._change_name(user_id, id, name)

        description = request.get('description')
        if description:
            self._change_description(user_id, id, description)

        if not name and not description:
            raise cherrypy.HTTPError(400, "Bad request")

    def _change_name(self, user_id: int, subaccount_id: int, name: str) -> None:
        query = 'UPDATE subaccounts SET name = %s WHERE id = %s AND user_id = %s RETURNING id'
        with WMM_MAIN_DB as db:
            updated = db.execute(query, (name, subaccount_id, user_id), ResultSet.ONE)
        if not updated:
            raise cherrypy.HTTPError(404, 'Subaccount not found')

    def _change_description(self, user_id: int, subaccount_id: int, description: str) -> None:
        query = 'UPDATE subaccounts SET description = %s WHERE id = %s AND user_id = %s RETURNING id'
        with WMM_MAIN_DB as db:
            updated = db.execute(query, (description, subaccount_id, user_id), ResultSet.ONE)
        if not updated:
            raise cherrypy.HTTPError(404, 'Subaccount not found')

    def DELETE(self, id: int) -> None:
        user_id = self._get_user_id(cherrypy.request.login)
        self._delete_subaccount(user_id, id)

    def _delete_subaccount(self, user_id: int, subaccount_id: int) -> None:
        query = 'DELETE FROM subaccounts WHERE id = %s AND user_id = %s RETURNING id'
        with WMM_MAIN_DB as db:
            deleted = db.execute(query, (subaccount_id, user_id), ResultSet.ONE)
        if not deleted:
            raise cherrypy.HTTPError(404, 'Subaccount not found')