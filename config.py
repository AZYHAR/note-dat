import os

# You need to replace the next values with the appropriate values for your configuration

basedir = os.path.abspath(os.path.dirname(__file__))

# parameters for SQL DATABASE
SQLALCHEMY_ECHO = False
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_DATABASE_URI = "postgres://oapkhmzmtcgxff:8b781c0600b5f99df0b6396f96025e2b4a88e438faca4825c1f81a25be4bdbbe@ec2-174-129-41-127.compute-1.amazonaws.com:5432/d8m66is64rok1e"

# token secret key
JWT_SECRET_KEY = 'jwt-secret-key'

# token blacklist
JWT_BLACKLIST_ENABLED = True
JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']
