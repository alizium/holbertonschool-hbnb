from flask_restx import Namespace, Resource, fields
from app.services.auth import login_user
from flask_jwt_extended import create_access_token
from app.services.facade import HBnBFacade

api = Namespace('auth', description='Auth operations')

login_model = api.model('Login', {
    'email': fields.String(required=True, description="User email"),
    'password': fields.String(required=True, description="User password")
})

token_model = api.model('Token', {
    'access_token': fields.String(description="JWT access token")
})

error_model = api.model('Error', {
    'error': fields.String()
})

@api.route('/login')
class Login(Resource):
    @api.expect(login_model, validate=True)
    @api.marshal_with(token_model)
    @api.response(200, 'Success', token_model)
    @api.response(401, 'Invalid credentials', error_model)
    def post(self):
        data = api.payload
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            api.abort(400, "Email and password are required")

        user = HBnBFacade().get_user_by_email(email)
        if not user or not user.check_password(password):
            api.abort(401, "Invalid credentials")

        # Génère le JWT Flask
        token = create_access_token(identity=str(user.id))
        return {'access_token': token}, 200
