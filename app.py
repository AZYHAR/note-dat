from flask import Blueprint
from flask_restful import Api
from routes.notebook import NotebookResource
from routes.note import NoteResource
from routes.auth import UserRegistration, UserLogin, UserLogoutAccess, UserLogoutRefresh, TokenRefresh, AllUsers

#help us to add routes and simplify some processes.
api_bp = Blueprint('api', __name__)
api = Api(api_bp)

#Create Routes for Notebooks and notes
api.add_resource(NotebookResource, '/notebook')
api.add_resource(NoteResource, '/note')

#Create Routes for Login, Logout and Registration 
api.add_resource(UserRegistration, '/auth/signup')
api.add_resource(UserLogin, '/auth/login')

#Create Routes for logout 
api.add_resource(UserLogoutAccess, '/auth/logout/access')
api.add_resource(UserLogoutRefresh, '/auth/logout/refresh')

#Create Routes for tokens
api.add_resource(TokenRefresh, '/auth/token/refresh')

#Create Routes for accessing all users
api.add_resource(AllUsers, '/auth/user/all')
