from flask import Blueprint
from flask_restful import Api
from routes.notebook import NotebookResource
from routes.note import NoteResource
from routes.auth import UserRegistration, UserLogin, UserLogoutAccess, UserLogoutRefresh, TokenRefresh, AllUsers

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

api.add_resource(NotebookResource, '/notebook')
api.add_resource(NoteResource, '/note')
api.add_resource(UserRegistration, '/auth/signup')
api.add_resource(UserLogin, '/auth/login')
api.add_resource(UserLogoutAccess, '/auth/logout/access')
api.add_resource(UserLogoutRefresh, '/auth/logout/refresh')
api.add_resource(TokenRefresh, '/auth/token/refresh')
api.add_resource(AllUsers, '/auth/user/all')
