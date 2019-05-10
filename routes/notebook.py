from flask import request
from flask_restful import Resource
from models.db import db
from models.notebook import Notebook, NotebookSchema
from flask_jwt_extended import jwt_required
import datetime

#creating schema for many notebookss and for one
notebooks_schema = NotebookSchema(many=True)
notebook_schema = NotebookSchema()

#Created 4 Endpoints GET, POST, PUT, DELETE
class NotebookResource(Resource):
    #GET REQUEST (Getting Data from server)
    @jwt_required
    def get(self):
        #why do we get all if we need only one to load / or we are loading all together
        #then we should get all by id of notebook 
        notebooks = Notebook.query.all()
        notebooks = notebooks_schema.dump(notebooks).data
        return {'status': 'success', 'data': notebooks}, 200

    #POST REQUEST (Adding notebook to server)
    @jwt_required
    def post(self):
        json_data = request.get_json(force=True)
        if not json_data:
               return {'message': 'No input data provided'}, 400
        # Validate and deserialize input
        data, errors = notebook_schema.load(json_data)
        if errors:
            return errors, 422

        #matching new notebook data by fields
        new_notebook = Notebook(
            title=data['title'],
            creation_date=datetime.datetime.now()
        )

        #submitting notebook to database
        db.session.add(new_notebook)
        db.session.commit()

        #(??)should we check if note with the same title already exist
        #that will be user easier to find specific note

        #get json from pyton object
        result = notebook_schema.dump(new_notebook).data

        return { "status": 'success', 'data': result }, 201

    #PUT REQUEST (Updating data on the server)
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

        #get json from pyton object
        result = notebook_schema.dump(notebook).data

        return { "status": "success", "data": result }, 201

    #DELETE REQUEST (DELETE data from the server)
    @jwt_required
    def delete(self):
        json_data = request.get_json(force=True)
        if not json_data:
               return {'message': 'No input data provided'}, 400
        
        # Validate and deserialize input
        data, errors = notebook_schema.load(json_data)
        
        if errors:
            return errors, 422

        notebook = Notebook.query.filter_by(id=data['id']).first()
        db.session.delete(notebook)
        db.session.commit()

        #get json from pyton object
        result = notebook_schema.dump(notebook).data

        return { "status": "success", "data": result}, 201
    