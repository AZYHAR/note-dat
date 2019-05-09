from flask import request
from flask_restful import Resource
from models.db import db
from models.notebook import Notebook, NotebookSchema
from flask_jwt_extended import (jwt_required, get_jwt_identity)
import datetime

notebooks_schema = NotebookSchema(many=True)
notebook_schema = NotebookSchema()

class NotebookResource(Resource):
    @jwt_required
    def get(self):
        user_id = get_jwt_identity()

        notebooks = Notebook.filter_by_user_id(user_id)
        notebooks = notebooks_schema.dump(notebooks).data
        return {'status': 'success', 'data': notebooks}, 200

    @jwt_required
    def post(self):
        json_data = request.get_json(force=True)
        if not json_data:
               return {'message': 'No input data provided'}, 400
        # Validate and deserialize input
        data, errors = notebook_schema.load(json_data)
        if errors:
            return errors, 422

        user_id = get_jwt_identity()

        print(user_id)

        notebook = Notebook(
            title=data['title'],
            creation_date=datetime.datetime.now(),
            user_id=user_id
        )

        print(notebook.user_id)

        try:
            db.session.add(notebook)
            db.session.commit()

            result = notebook_schema.dump(notebook).data
            
            return { "status": 'success', 'data': result }, 201
        except:
            return { "message": "Cannot save notebook" }, 500

    @jwt_required
    def put(self):
        json_data = request.get_json(force=True)
        if not json_data:
            return {'message': 'No input data provided'}, 400
        # Validate and deserialize input
        data, errors = notebook_schema.load(json_data)
        if errors:
            return errors, 422
        notebook = Notebook.query.filter_by(id=data['id']).first()
        if not notebook:
            return {'message': 'Category does not exist'}, 400
        notebook.title = data['title']
        
        db.session.commit()

        result = notebook_schema.dump(notebook).data

        return { "status": "success", "data": result }, 201

    @jwt_required
    def delete(self):
        json_data = request.get_json(force=True)
        if not json_data:
               return {'message': 'No input data provided'}, 400
        # Validate and deserialize input
        data, errors = notebook_schema.load(json_data)
        if errors:
            return errors, 422
        notebook = Notebook.query.filter_by(id=data['id']).delete()
        db.session.commit()

        result = notebook_schema.dump(notebook).data

        return { "status": "success", "data": result}, 201
    