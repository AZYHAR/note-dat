from flask import Flask
from marshmallow import Schema, fields, pre_load, validate
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy


ma = Marshmallow()
db = SQLAlchemy()


class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250))
    body = db.Column(db.String())
    creation_date = db.Column(db.DateTime, server_default=db.func.current_timestamp(), nullable=False)
    notebook_id = db.Column(db.Integer, db.ForeignKey('notebooks.id', ondelete='CASCADE'), nullable=False)


class Notebook(db.Model):
    __tablename__ = 'notebooks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text)
    creation_date = db.Column(db.DateTime)
    
    def __init__(self, title, creation_date):
        self.title = title
        self.creation_date = creation_date


class NoteSchema(ma.Schema):
    id = fields.Integer()
    title = fields.String(required=True)
    body = fields.String(required=True)
    creation_date = fields.DateTime()
    notebook_id = fields.Integer(required=True)


class NotebookSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    title = fields.String(required=True)
    creation_date = fields.DateTime()