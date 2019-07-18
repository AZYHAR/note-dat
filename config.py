import os

# You need to replace the next values with the appropriate values for your configuration

basedir = os.path.abspath(os.path.dirname(__file__))

#parameters for SQL DATABASE
SQLALCHEMY_ECHO = False
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_DATABASE_URI = "postgres://iqcmcpjkfsydhq:c6ac671de1a2ace64effcb45b2fdbeb3748d0e9af3c5dbf125ad37d3341ce87b@ec2-107-21-216-112.compute-1.amazonaws.com:5432/dfi5q9e71njile"

#token secret key
JWT_SECRET_KEY = 'jwt-secret-key'

#token blacklist
JWT_BLACKLIST_ENABLED = True
JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']