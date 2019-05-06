from flask import request
from flask_restful import Resource
from models.db import db
from models.note import Note, NoteSchema
import datetime

notes_schema = NoteSchema(many=True)
note_schema = NoteSchema()

class NoteResource(Resource):
    def get(self):
        notes = Note.query.all()
        notes = notes_schema.dump(notes).data
        return {'status': 'success', 'data': notes}, 200

    def post(self):
        json_data = request.get_json(force=True)
        if not json_data:
               return {'message': 'No input data provided'}, 400
        # Validate and deserialize input
        data, errors = note_schema.load(json_data)
        if errors:
            return errors, 422

        note = Note(
            title=data['title'],
            body=data['body'],
            creation_date=datetime.datetime.now(),
            notebook_id=data['notebook_id']
        )

        db.session.add(note)
        db.session.commit()

        result = note_schema.dump(note).data

        return { "status": 'success', 'data': result }, 201

    def put(self):
        json_data = request.get_json(force=True)
        if not json_data:
            return {'message': 'No input data provided'}, 400
        # Validate and deserialize input
        data, errors = note_schema.load(json_data)
        if errors:
            return errors, 422
        note = Note.query.filter_by(id=data['id']).first()
        if not note:
            return {'message': 'Category does not exist'}, 400
        note.title = data['title']
        note.body = data['body']
        note.notebook_id = data['notebook_id']
        
        db.session.commit()

        result = note_schema.dump(note).data

        return { "status": "success", "data": result }, 201

    def delete(self):
        json_data = request.get_json(force=True)
        if not json_data:
               return {'message': 'No input data provided'}, 400
        # Validate and deserialize input
        data, errors = note_schema.load(json_data)
        if errors:
            return errors, 422
        note = Note.query.filter_by(id=data['id']).delete()
        db.session.commit()

        result = note_schema.dump(note).data

        return { "status": "success", "data": result}, 201