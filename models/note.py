from flask import Flask
from marshmallow import Schema, fields, pre_load, validate
from models.db import db, ma
from models.user import UserModel

#Defines table structure
class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250))
    body = db.Column(db.String())
    creation_date = db.Column(db.DateTime, server_default=db.func.current_timestamp(), nullable=False)
    notebook_id = db.Column(db.Integer, db.ForeignKey('notebooks.id', ondelete='CASCADE'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))

#Using for validation
class NoteSchema(ma.Schema):
    id = fields.Integer()
    title = fields.String(required=True)
    body = fields.String(required=True)
    creation_date = fields.DateTime()
    notebook_id = fields.Integer(required=True)