import os

# You need to replace the next values with the appropriate values for your configuration

basedir = os.path.abspath(os.path.dirname(__file__))

#parameters for SQL DATABASE
SQLALCHEMY_ECHO = False
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_DATABASE_URI = "postgres://emdgasxpuybpur:e4c979ebe7fbb392ef8ea16f5d314e6b82e37c70ef88a2efd65a682fa1ad00a3@ec2-50-16-197-244.compute-1.amazonaws.com:5432/depie0b194vn8i"

#token secret key
JWT_SECRET_KEY = 'jwt-secret-key'

#token blacklist
JWT_BLACKLIST_ENABLED = True
JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']