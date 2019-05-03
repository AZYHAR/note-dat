import os

# You need to replace the next values with the appropriate values for your configuration

basedir = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_ECHO = False
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_DATABASE_URI = "sqlite:///app.db"

JWT_SECRET_KEY = 'jwt-secret-key'
JWT_BLACKLIST_ENABLED = True
JWT_BLACKLIST_TOEKN_CHECKS = ['access', 'refresh']