from database_management import Database, ResultSet
import configparser


DBINFO = configparser.ConfigParser()
DBINFO.read('database.config')

WMM_MAIN_DB = Database(DBINFO['Database']['Name'], DBINFO['User']['Name'], DBINFO['Database']['Host'], DBINFO['Database']['Port'])