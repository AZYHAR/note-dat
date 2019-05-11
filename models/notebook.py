from flask import Flask
from marshmallow import Schema, fields, pre_load, validate
from models.db import db, ma
from models.note import Note
from note import Note

#Creating model for Notebook
class Notebook(db.Model):
    __tablename__ = 'notebooks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text)
    creation_date = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))
    notes = db.relationship("Note", cascade="all,delete", backref = "notebooks")
    
    @classmethod
    def filter_by_user_id(cls, user_id):
        return cls.query.filter_by(user_id = user_id).all()

#Using for validation
class NotebookSchema(ma.Schema):
    id = fields.Integer()
    title = fields.String(required=True)
    creation_date = fields.DateTime()