from database_management import Database, ResultSet
import configparser

DBNAME_MAIN = 'wmm'
DBNAME_TEST = 'wmm_test'
DBUSER = 'wmm_admin'
DBHOST = '127.0.0.1'
DBPASSWORD = 'Ecv5Fat!fF92(R<b'
DBPORT = '5432'

TOKEN_LENGTH = 30

QUERIES = configparser.ConfigParser()
QUERIES.read('queries.ini')

WMM_MAIN_DB = Database(DBNAME_MAIN, DBUSER, DBHOST, DBPASSWORD, DBPORT)
WMM_TEST_DB = Database(DBNAME_TEST, DBUSER, DBHOST, DBPASSWORD, DBPORT)