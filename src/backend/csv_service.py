from config import CHERRYPY_CONFIG_DEFAULT, WITH_AUTHENTICATION
from database_repository import WMM_MAIN_DB
from database_management import ResultSet
import csv
import cherrypy
from typing import List, Dict, Union
import time
@cherrypy.expose
class CSVService:

    @cherrypy.tools.json_out()
    def GET(self) -> List[Dict[str, Union[str, int]]]:
        csvs = self._get_csv_list()
        return csvs

    def _get_csv_list(self) -> List[Dict[str, Union[str, int]]]:
        query = 'SELECT id, name FROM csv_formats'
        with WMM_MAIN_DB as db:
            info = db.execute(query, (), ResultSet.ALL)
        result = []

        for i in info:
            result.append({'id': i[0], 'name': i[1]})
        return result

    @cherrypy.tools.json_out()
    def POST(self, csv_file, format_id: int, subaccount_id: int):
        csv_info = self._get_csv_info(format_id)
        entries = self._read_csv_file(csv_file, csv_info['starting_row'], csv_info['title_index'], csv_info['date_index'], csv_info['amount_index'], csv_info['separator'])
        user_id = self._get_user_id(cherrypy.request.login)
        category_id = self._get_category(user_id)
        self._add_entries(entries, user_id, category_id, subaccount_id)


    def _add_entries(self, entries: List[Dict[str, int]], user_id: int, category_id: int, subaccount_id: int):
        query = 'INSERT INTO entries (user_id, category_id, subaccount_id, date, amount, comment) VALUES '
        parameters = ()

        first_entry = True
        for entry in entries:
            pattern = '%Y-%m-%d'
            epoch = int(time.mktime(time.strptime(entry['date'], pattern)))
            parameters += (user_id, category_id, subaccount_id, epoch, entry['amount'].replace(',','.'), entry['title'])
            if first_entry:
                first_entry = False
                query += '(%s, %s, %s, %s, %s, %s)'
            else:
                query += ', (%s, %s, %s, %s, %s, %s)'

        with WMM_MAIN_DB as db:
            db.execute(query, parameters, ResultSet.NONE)
    def _get_category(self, user_id: int) -> int:
        query = 'SELECT id FROM categories WHERE user_id = %s'
        with WMM_MAIN_DB as db:
            category_id = db.execute(query, (user_id,), ResultSet.ONE)
        if category_id:
            return category_id[0]
        else:
            raise cherrypy.HTTPError(404, 'Categories for user not found')

    def _get_user_id(self, login: str) -> int:
        query = 'SELECT id FROM users WHERE login = %s'
        with WMM_MAIN_DB as db:
            user_id = db.execute(query, (login,), ResultSet.ONE)[0]
        return user_id

    def _read_csv_file(self, csv_file, starting_row: int, title_index: int, date_index: int, amount_index: int, separator: str) -> List[Dict[str, int]]:
        data = csv_file.file.read().decode('utf-8')
        data = data.split('\n')[starting_row-1:]
        csv_reader = csv.reader(data, delimiter = separator)
        result = []
        for row in csv_reader:
            if row:
                result.append({'title': row[title_index], 'date': row[date_index], 'amount': row[amount_index]})
            else:
                break

        return result

    def _get_csv_info(self, format_id: int) -> Dict[str, Union[str, int]]:
        query = 'SELECT title_index, date_index, amount_index, starting_row, separator FROM csv_formats WHERE id = %s'
        with WMM_MAIN_DB as db:
            info = db.execute(query, (int(format_id),), ResultSet.ONE)
        if info is not None:
            result = {'title_index': info[0], 'date_index': info[1], 'amount_index': info[2], 'starting_row': info[3], 'separator': info[4]}
            return result
        else:
            raise cherrypy.HTTPError(404, 'CSV format not found')