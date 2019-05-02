from flask import Blueprint
from flask_restful import Api
from routes.notebook import NotebookResource
from routes.note import NoteResource

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

api.add_resource(NotebookResource, '/notebook')
api.add_resource(NoteResource, '/note')