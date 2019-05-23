from flask import request
from flask_restful import Resource
from models.user import UserModel, UserSchema, RevokedTokenModel
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)


#creating schema for many users and for one
user_schema = UserSchema()
users_schema = UserSchema(many=True)

#Created 1 Endpoints POST
class UserRegistration(Resource):
    def post(self):
        #geting new user data from fron-end 
        json_data = request.get_json(force=True)
        if not json_data:
            return {'message': 'No input data provided'}, 400
        
        # Validate and deserialize input
        data, errors = user_schema.load(json_data)
        if errors:
            return errors, 422

        #check if user exist by email field
        if UserModel.find_by_email(data['email']):
            return {'message': 'User {} already exists.'.format(data['email'])}, 422

        #matching new user data by fields
        new_user = UserModel(
            name = data['name'],
            email = data['email'],
            password = UserModel.generate_hash(data['password'])
        )

        #check on errors
        try:
            #save user to db
            new_user.save_to_db()

            #add user_id to second part of token = payload
            access_token = create_access_token(identity = new_user.id)
            refresh_token = create_refresh_token(identity = new_user.id)

            return {
                'message': 'User {} was created'.format(data['name']),
                'email': new_user.email,
                'name': new_user.name,
                'access_token': access_token,
                'refresh_token': refresh_token
            }
        except:
            return {'message': 'Something went wrong'}, 500

#Created 1 Endpoints POST
class UserLogin(Resource):
    def post(self):
        #geting login user data from fron-end 
        json_data = request.get_json(force=True)
        if not json_data:
               return {'message': 'No input data provided'}, 400
        
        # Validate and deserialize input
        data, errors = user_schema.load(json_data)
        if errors:
            return errors, 422
        
        #find login user in database
        current_user = UserModel.find_by_email(data['email'])
        if not current_user:
            return {'message': 'User {} doesn\'t exist'.format(data['email'])}, 403
        
        #check if login user entered right password
        if UserModel.verify_hash(data['password'], current_user.password):
            #add user_id to second part of token = payload
            access_token = create_access_token(identity = current_user.id)
            refresh_token = create_refresh_token(identity = current_user.id)

            return {
                'message': 'Logged in as {}'.format(current_user.name),
                'email': current_user.email,
                'name': current_user.name,
                'access_token': access_token,
                'refresh_token': refresh_token
                }
        else:
            return {'message': 'Wrong credentials'}, 403

#Created 1 Endpoints POST // what is 
class UserLogoutAccess(Resource):
    @jwt_required
    def post(self):
        #get jti(unique_id) of token from payload
        jti = get_raw_jwt()['jti']
        
        try:
            #add jti(unique_id) token to blacklist
            revoked_token = RevokedTokenModel(jti = jti)
            revoked_token.save_to_db()
            
            return {'message': 'Access token has been revoked'}, 200
        except:
            return {'message': 'Something went wrong'}, 500

#Created 1 Endpoints POST // what is responsible for
class UserLogoutRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        #get jti(unique_id) of token from payload
        jti = get_raw_jwt()['jti']
        try:
            #add jti(unique_id) token to blacklist
            revoked_token = RevokedTokenModel(jti = jti)
            revoked_token.save_to_db()
            return {'message': 'Refresh token has been revoked'}
        except:
            return {'message': 'Something went wrong'}, 500
      
#Created 1 Endpoints POST
class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        #get identity from payload(user_id)
        user_id = get_jwt_identity()
        access_token = create_access_token(identity = user_id)
        
        return {
            'access_token': access_token
            }
      

#Created 2 Endpoints POST, DELETE
class AllUsers(Resource):
    def get(self):
        return {'message': 'List of users'}

    def delete(self):
        return {'message': 'Delete all users'}