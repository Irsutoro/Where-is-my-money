import cherrypy
from config import CHERRYPY_CONFIG_DEFAULT, WITH_AUTHENTICATION
from base64 import b64decode
from database_repository import WMM_MAIN_DB
from database_management import ResultSet
from typing import Dict

@cherrypy.expose
class UserService:

    @cherrypy.tools.json_out()
    def GET(self) -> Dict[str, str]:
       user_info = self._get_user_info(cherrypy.request.login)
       return user_info

    def _get_user_info(self, login: str) -> Dict[str, str]:
        query = ' SELECT email, username, registration_date FROM users WHERE login = %s'
        with WMM_MAIN_DB as db:
            user_info = db.execute(query, (login,), ResultSet.ONE)
        return {'email': user_info[0], 'username': user_info[1], 'registration_date': str(user_info[2])}

    @cherrypy.tools.json_in()
    def PUT(self):
        request = cherrypy.request.json
        login = cherrypy.request.login

        password = request.get('password')
        if password:
            self._update_password(password, login)

        email = request.get('email')
        if email:
            self._update_email(email, login)

        username = request.get('username')
        if username:
            self._update_username(username, login)


    def _update_password(self, new_password: str, login: str) -> None:
        query = 'UPDATE users set password = %s WHERE login = %s'
        with WMM_MAIN_DB as db:
            db.execute(query, (new_password, login), ResultSet.NONE)

    def _update_username(self, new_username: str, login: str) -> None:
        query = 'UPDATE users set username = %s WHERE login = %s'
        with WMM_MAIN_DB as db:
            db.execute(query, (new_username, login), ResultSet.NONE)

    def _update_email(self, new_email: str, login: str) -> None:
        query = 'UPDATE users set email = %s WHERE login = %s'
        with WMM_MAIN_DB as db:
            db.execute(query, (new_email, login), ResultSet.NONE)

    def DELETE(self):
        self._delete_user(cherrypy.request.login)

    def _delete_user(self, login: str) -> None:
        query = 'DELETE FROM users WHERE login = %s'
        with WMM_MAIN_DB as db:
            db.execute(query, (login,), ResultSet.NONE)

