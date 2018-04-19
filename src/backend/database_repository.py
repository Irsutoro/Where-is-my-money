from database_management import Database

DBNAME_MAIN = 'wmm'
DBNAME_TEST = 'wmm_test'
DBUSER = 'wmm_admin'
DBHOST = '127.0.0.1'
DBPASSWORD = 'Ecv5Fat!fF92(R<b'
DBPORT = '5432'

database_model = {
    'users': ['id', 'login', 'password', 'email', 'username', 'is_activated', 'token', 'registration_date'],
    'subaccounts': ['id', 'user_id', 'name'],
    'categories': ['id', 'user_id', 'name'],
    'csv_formats': ['id', 'user_id', 'name', 'title_index', 'date_index', 'amount_index', 'starting_row', 'separator'],
    'entries': ['id', 'user_id', 'category_id', 'subaccount_id', 'currency_id', 'date', 'amount', 'comment'],
    'title_to_category_map': ['id', 'user_id', 'category_id', 'pattern'],
    'currencies': ['id', 'fullname', 'code']
}

TOKEN_LENGTH = 20

REGISTER_USER = "INSERT INTO users (login, password, email, username, registration_date, token) VALUES (%s, %s, %s, %s, %s, %s)"
ACTIVATE_USER_ACCOUNT = "UPDATE users SET is_activated=TRUE, token=NULL WHERE token = %s RETURNING id"
CHECK_IF_USER_EXISTS = "SELECT id FROM users WHERE login = %s and password = %s"

VALIDATE_PASSWORD = "SELECT is_activated FROM users WHERE login=%s AND password=%s"
CHANGE_USERNAME = "UPDATE users SET username=%s WHERE login=%s"
CHANGE_EMAIL = "UPDATE users SET email=%s WHERE login=%s"
CHANGE_PASSWORD = "UPDATE users SET password=%s WHERE login=%s"

WMM_MAIN_DB = Database(DBNAME_MAIN, DBUSER, DBHOST, DBPASSWORD, DBPORT)
WMM_TEST_DB = Database(DBNAME_TEST, DBUSER, DBHOST, DBPASSWORD, DBPORT)