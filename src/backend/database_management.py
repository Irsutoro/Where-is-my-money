import psycopg2
from enum import Enum, auto

class ResultSet(Enum):
    NONE = None
    ONE = auto()
    ALL = auto()

class Database:
    def __init__(self, dbname, user, host, password, port):
        self.connection_string = f"dbname={dbname} user={user} host={host} password={password} port={port}"
        self.connection = None

    def __enter__(self):
        self.connection = psycopg2.connect(self.connection_string)

    def __exit__(self, *args):
        self.connection.close()

    def execute(self, sql: str, parameters: tuple, result_set: ResultSet):
        with self.connection:
            with self.connection.cursor() as curs:
                curs.execute(sql, parameters)
                if result_set is not ResultSet.NONE:
                    rows = curs.fetchone() if result_set == ResultSet.ONE else curs.fetchall()
                else:
                    rows = None
        return rows
