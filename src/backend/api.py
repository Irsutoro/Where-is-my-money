import cherrypy
from auth_service import AuthService
from user_service import UserService
from subaccount_service import SubaccountService
from category_service import CategoryService
from transaction_service import TransactionService
from config import WITH_AUTHENTICATION, WITHOUT_AUTHENTICATION, CHERRYPY_CONFIG_DEFAULT


if __name__ == '__main__':
    cherrypy.config.update(CHERRYPY_CONFIG_DEFAULT)
    cherrypy.tree.mount(AuthService(), '/api/auth', WITHOUT_AUTHENTICATION)
    cherrypy.tree.mount(UserService(), '/api/user', WITH_AUTHENTICATION)
    cherrypy.tree.mount(SubaccountService(), '/api/subaccounts', WITH_AUTHENTICATION)
    cherrypy.tree.mount(CategoryService(), '/api/categories', WITH_AUTHENTICATION)
    cherrypy.tree.mount(TransactionService(), '/api/transactions', WITH_AUTHENTICATION)

    cherrypy.engine.start()
    cherrypy.engine.block()