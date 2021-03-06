from flask import request
from flask_restful import Resource
from models.db import db
from models.note import Note, NoteSchema
from models.notebook import Notebook
from flask_jwt_extended import (jwt_required, get_jwt_identity)
import pytz
from datetime import datetime

#creating schema for many notes and for one
note_schema = NoteSchema()
notes_schema = NoteSchema(many=True)


#Created 4 Endpoints GET, POST, PUT, DELETE
class NoteResource(Resource):
    #GET REQUEST (Getting Data from server)
    @jwt_required
    def get(self):
        user_id = get_jwt_identity()

        notes = Note.filter_by_user_id(user_id)
        notes = notes_schema.dump(notes).data
        return {'status': 'success', 'data': notes}, 200

    #POST REQUEST (Adding note to server)
    @jwt_required
    def post(self):
        #geting data from fron-end 
        json_data = request.get_json(force=True)
        if not json_data:
            return {'message': 'No input data provided'}, 400
            
        # Validate and deserialize input
        data, errors = note_schema.load(json_data)
        if errors:
            return errors, 422

        user_id = get_jwt_identity()

        notebook = Notebook.query.filter_by(id=data['notebook_id']).first()
        if not notebook:
            return {'message': 'Category does not exist'}, 400

        notebook.modified_date = datetime.now(pytz.utc)

        #matching new note data by fields
        new_note = Note(
            title = data['title'],
            body = data['body'],
            creation_date = datetime.now(pytz.utc),
            modified_date = datetime.now(pytz.utc),
            notebook_id = data['notebook_id'],
            user_id=user_id
        )

        #submitting note to database
        db.session.add(new_note)
        db.session.commit()

        #get json from pyton object
        result = note_schema.dump(new_note).data

        return { "status": 'success', 'data': result }, 201

    #PUT REQUEST (Updating data on the server)
    @jwt_required
    def put(self):
        #geting data from fron-end 
        json_data = request.get_json(force=True)
        if not json_data:
            return {'message': 'No input data provided'}, 400
        # Validate and deserialize input
        data, errors = note_schema.load(json_data)
        if errors:
            return errors, 422
        
        notebook = Notebook.query.filter_by(id=data['notebook_id']).first()
        if not notebook:
            return {'message': 'Category does not exist'}, 400

        notebook.modified_date = datetime.now(pytz.utc)

        note = Note.query.filter_by(id=data['id']).first()
        if not note:
            return {'message': 'Category does not exist'}, 400
        
        note.title = data['title']
        note.body = data['body']
        note.notebook_id = data['notebook_id']
        note.modified_date = datetime.now(pytz.utc)
        
        db.session.commit()

        #get json from pyton object
        result = note_schema.dump(note).data

        return { "status": "success", "data": result }, 201

    #DELETE REQUEST (DELETE data from the server)
    @jwt_required
    def delete(self):
        if 'id' not in request.args:
            return {'message': 'Required argument is missing'}, 400
    
        note = Note.query.filter_by(id=request.args.get('id')).first()

        db.session.delete(note)
        db.session.commit()

        #get json from python object
        result = note_schema.dump(note).data

        return { "status": "success", "data": result}, 201
