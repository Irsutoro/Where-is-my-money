from config import CHERRYPY_CONFIG_DEFAULT, WITH_AUTHENTICATION
from database_repository import WMM_MAIN_DB, QUERIES
from database_management import ResultSet
import csv
import cherrypy

@cherrypy.expose
class CSVService:

    @cherrypy.tools.json_out()
    def GET(self):
        query = QUERIES['CSV']['List']
        with WMM_MAIN_DB as db:
            info = db.execute(query, (), ResultSet.ALL)
        result = []

        for i in info:
            result.append({'id': i[0], 'name': i[1]})
        return result

    @cherrypy.tools.json_out()
    def POST(self, csv_file, format_id):
        query = QUERIES['CSV']['Info']
        with WMM_MAIN_DB as db:
            info = db.execute(query, (int(format_id),), ResultSet.ONE)
        if info is not None:
            data = csv_file.file.read().decode('utf-8')
            data = data.split('\n')[info[3]-1:]
            csv_reader = csv.reader(data, delimiter = info[4])
            result = []
            for row in csv_reader:
                if row:
                    result.append({'title': row[info[0]], 'date': row[info[1]], 'amount': row[info[2]]})
                else:
                    break

            return result
        else:
            raise cherrypy.HTTPError(404, 'CSV format not found')