from models.db import db, ma
from marshmallow import fields
from passlib.hash import pbkdf2_sha256 as sha256

#Defines table structure
class UserModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable = False)
    name = db.Column(db.String(120), nullable = False)


    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email = email).first()
    
    #generating hash for password
    @staticmethod
    def generate_hash(password):
        return sha256.hash(password)
    
    #check if hashes match
    @staticmethod
    def verify_hash(password, hash):
        return sha256.verify(password, hash)

    #saving user to database
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

#Defines table structure
class RevokedTokenModel(db.Model):
    __tablename__ = 'revoked_tokens'

    id = db.Column(db.Integer, primary_key = True)
    jti = db.Column(db.String(120))
    
    #save token to db token
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
    
    #check if token is in blacklist
    @classmethod
    def is_jti_blacklisted(cls, jti):
        #check last given token 
        query = cls.query.filter_by(jti = jti).first()
        return bool(query)

#Using for validation
class UserSchema(ma.Schema):
    id = fields.Integer()
    email = fields.String()
    password = fields.String()
    name = fields.String()