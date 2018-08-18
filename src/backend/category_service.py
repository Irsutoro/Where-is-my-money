import cherrypy
from config import CHERRYPY_CONFIG_DEFAULT, WITH_AUTHENTICATION
from base64 import b64decode
from database_repository import WMM_MAIN_DB
from database_management import ResultSet
from typing import List, Dict, Union

@cherrypy.expose
class CategoryService:

    @cherrypy.tools.json_out()
    def GET(self) -> List[Dict[str, Union[str, int]]]:
        user_id = self._get_user_id(cherrypy.request.login)
        categories = self._get_categories(user_id)
        return categories

    def _get_user_id(self, login: str) -> int:
        query = 'SELECT id FROM users WHERE login = %s'
        with WMM_MAIN_DB as db:
            user_id = db.execute(query, (login,), ResultSet.ONE)[0]
        return user_id

    def _get_categories(self, user_id: int) -> List[Dict[str, Union[str, int]]]:
        query = 'SELECT id, name FROM categories WHERE user_id = %s'
        with WMM_MAIN_DB as db:
            categories = db.execute(query, (user_id,), ResultSet.ALL)
        return [{'id': id, 'name': name} for id, name in categories]


    @cherrypy.tools.json_in()
    def POST(self) -> None:
        request = cherrypy.request.json
        user_id = self._get_user_id(cherrypy.request.login)
        try:
            self._create_category(request['name'], user_id)
        except (KeyError, TypeError):
            raise cherrypy.HTTPError(400, "Bad request")

    def _create_category(self, name: str, user_id: int) -> None:
        query = 'INSERT INTO categories (user_id, name) VALUES (%s, %s)'
        with WMM_MAIN_DB as db:
            db.execute(query, (user_id, name), ResultSet.NONE)

    @cherrypy.tools.json_in()
    def PUT(self, id: int) -> None:
        request = cherrypy.request.json
        user_id = self._get_user_id(cherrypy.request.login)
        try:
            self._change_category_name(request['name'], id, user_id)
        except (KeyError, TypeError):
            raise cherrypy.HTTPError(400, "Bad request")

    def _change_category_name(self, name: str, category_id: int, user_id: int) -> None:
        query = 'UPDATE categories SET name = %s WHERE id = %s AND user_id = %s RETURNING id'
        with WMM_MAIN_DB as db:
            updated = db.execute(query, (name, category_id, user_id), ResultSet.ONE)
        if not updated:
                raise cherrypy.HTTPError(404, 'Category not found')

    def DELETE(self, id):
        user_id = self._get_user_id(cherrypy.request.login)
        self._delete_category(id, user_id)

    def _delete_category(self, category_id: int, user_id: int) -> None:
        query = 'DELETE FROM categories WHERE id = %s AND user_id = %s RETURNING id'
        with WMM_MAIN_DB as db:
            deleted = db.execute(query, (category_id, user_id), ResultSet.ONE)
        if not deleted:
                raise cherrypy.HTTPError(404, 'Category not found')