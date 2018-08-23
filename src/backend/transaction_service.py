import cherrypy
from config import CHERRYPY_CONFIG_DEFAULT, WITH_AUTHENTICATION
from database_repository import WMM_MAIN_DB
from database_management import ResultSet
from typing import List, Tuple, Union

@cherrypy.expose
class TransactionService:

    @cherrypy.tools.json_out()
    def GET(self, time_to: int = None, time_from: int = None, subaccount_id: int = None, category_id: int = None):
        user_id = self._get_user_id(cherrypy.request.login)
        query, parameters = self._generate_query(user_id, time_to, time_from, subaccount_id, category_id)

        transactions = self._get_transaction_list(query, parameters)

        result = []
        for t in transactions:
            result.append({
                'id': t[0],
                'date': t[1],
                'amount': t[2],
                'comment': t[3],
                'category': t[4],
                'subaccount': t[5],
                'category_id': t[6],
                'subaccount_id': t[7],
                'currency': t[8],
                'currency_id': t[9],
                })
        return result

    def _get_user_id(self, login: str) -> int:
        query = 'SELECT id FROM users WHERE login = %s'
        with WMM_MAIN_DB as db:
            user_id = db.execute(query, (login,), ResultSet.ONE)[0]
        return user_id

    def _get_transaction_list(self, query: str, parameters: Tuple[int]) ->  List[List[Union[str,int]]]:
        with WMM_MAIN_DB as db:
            data = db.execute(query, parameters, ResultSet.ALL)
        return data

    def _generate_query(self, user_id: int, time_to: int = None, time_from: int = None, subaccount_id: int = None, category_id: int = None) -> str:
        query = 'SELECT e.id, date, amount, comment, c.name, s.name, c.id, s.id, cu.code, cu.id FROM entries e JOIN subaccounts s ON s.id = e.subaccount_id JOIN categories c ON c.id = e.category_id JOIN currencies cu ON cu.id = s.currency_id WHERE e.user_id = %s'
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
        return query, parameters

    @cherrypy.tools.json_in()
    def POST(self) -> None:
        request = cherrypy.request.json
        user_id = self._get_user_id(cherrypy.request.login)
        try:
            authorized = self._authorize_users_category_and_subaccount(user_id, request['subaccount_id'], request['category_id'])
            if authorized:
                self._insert_new_transaction(user_id, request['category_id'],
                                            request['subaccount_id'],
                                            request['date'], round(float(request['amount'].replace(',','.')),2),
                                            request.get('comment', None))
            else:
                raise cherrypy.HTTPError(401, 'Unauthorized')
        except (KeyError, TypeError):
            raise cherrypy.HTTPError(400, 'Bad Request')

    def _authorize_users_category_and_subaccount(self, user_id: int, subaccount_id: int, category_id: int) -> bool:
        query = 'SELECT EXISTS (SELECT * FROM users u JOIN subaccounts s ON u.id = s.user_id JOIN categories c ON u.id = c.user_id WHERE u.id = %s AND s.id = %s AND c.id = %s)'
        with WMM_MAIN_DB as db:
            authorized = db.execute(query, (user_id, subaccount_id, category_id), ResultSet.ONE)
        return bool(authorized)

    def _insert_new_transaction(self, user_id: int, category_id: int, subaccount_id: int, date: int, amount: int, comment: str = None) -> None:
        query = 'INSERT INTO entries (user_id, category_id, subaccount_id, date, amount, comment) VALUES (%s, %s, %s, %s, %s, %s)'
        with WMM_MAIN_DB as db:
            db.execute(query, (user_id, category_id, subaccount_id, date, amount, comment), ResultSet.NONE)


    @cherrypy.tools.json_in()
    def PUT(self, id: int) -> None:
        request = cherrypy.request.json
        user_id = self._get_user_id(cherrypy.request.login)

        if request.get('subaccount_id'):
            if not self._authorize_subaccount(user_id, request['subaccount_id']):
                raise cherrypy.HTTPError(401, 'Unauthorized')
        if request.get('category_id'):
            if not self._authorize_category(user_id, request['category_id']):
                raise cherrypy.HTTPError(401, 'Unauthorized')

        query, parameters = self._generate_update_query(request.get('category_id'), request.get('subaccount_id'), request.get('date'), round(float(request.get('amount').replace(',','.')),2), request.get('comment'), id, user_id)

        with WMM_MAIN_DB as db:
            updated = db.execute(query, parameters, ResultSet.ONE)
        if not updated:
            raise cherrypy.HTTPError(404, 'Entry not found')



    def _authorize_category(self, user_id: int, category_id: int) -> bool:
        query = 'SELECT EXISTS (SELECT * FROM users u JOIN categories c ON u.id = c.user_id WHERE u.id = %s AND c.id = %s)'
        with WMM_MAIN_DB as db:
            authorized = db.execute(query, (user_id, category_id), ResultSet.ONE)
        return bool(authorized)

    def _authorize_subaccount(self, user_id: int, subaccount_id: int) -> bool:
        query = 'SELECT EXISTS (SELECT * FROM users u JOIN subaccounts s ON u.id = s.user_id WHERE u.id = %s AND s.id = %s)'
        with WMM_MAIN_DB as db:
            authorized = db.execute(query, (user_id, subaccount_id), ResultSet.ONE)
        return bool(authorized)

    def _generate_update_query(self, category_id: int, subaccount_id: int, date: int, amount: int, comment: str, entry_id: int, user_id: int) -> Tuple[str, Tuple[Union[int, str]]]:
        query = 'UPDATE entries SET'
        parameters = ()
        if category_id:
            query += ' category_id = %s,'
            parameters += (category_id,)
        if subaccount_id:
            query += ' subaccount_id = %s,'
            parameters += (subaccount_id,)
        if date:
            query += ' date = %s,'
            parameters += (date,)
        if amount:
            query += ' amount = %s,'
            parameters += (amount,)
        if comment:
            query += ' comment = %s,'
            parameters += (comment,)

        query += ' user_id = %s WHERE user_id = %s AND id = %s RETURNING id'
        parameters += (user_id, user_id, entry_id)
        return query, parameters


    def DELETE(self, id: int) -> None:
        user_id = self._get_user_id(cherrypy.request.login)
        self._delete_entry(user_id, id)

    def _delete_entry(self, user_id: int, entry_id: int) -> None:
        query = 'DELETE FROM entries WHERE id = %s AND user_id = %s RETURNING id'
        with WMM_MAIN_DB as db:
            deleted = db.execute(query, (entry_id, user_id), ResultSet.ONE)
        if not deleted:
            raise cherrypy.HTTPError(404, 'Entry not found')
