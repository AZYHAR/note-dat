from flask import Flask
from marshmallow import Schema, fields, pre_load, validate
from models.db import db, ma
from models.user import UserModel

class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250))
    body = db.Column(db.String())
    creation_date = db.Column(db.DateTime, server_default=db.func.current_timestamp(), nullable=False)
    notebook_id = db.Column(db.Integer, db.ForeignKey('notebooks.id', ondelete='CASCADE'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))

    @classmethod
    def filter_by_user_id(cls, user_id):
        return cls.query.filter_by(user_id = user_id).all()
    
    @classmethod
    def filter_by_notebook_id(cls, notebook_id):
        return cls.query.filter_by(notebook_id = notebook_id).all()

class NoteSchema(ma.Schema):
    id = fields.Integer()
    title = fields.String(required=True)
    body = fields.String(required=True)
    creation_date = fields.DateTime()
    notebook_id = fields.Integer(required=True)