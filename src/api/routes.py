"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

api = Blueprint('api', __name__)

#Creacion de usuario, Registro
@api.route('/signup' , methods=['POST'])
def sign_up():
    body = request.get_json()
    new_user = User(email = body["email"], password = body["password"], is_active = True)
    db.session.add(new_user)
    db.session.commit()

    response_body = {
        "message": "Se creo usuario Form"
    }

    return jsonify(response_body), 200


#Recupera todos los usuarios creados.
@api.route('/user', methods=['GET'])
def get_users():
    all_users = User.query.all()
    result = list(map(lambda item: item.serialize(), all_users))
    return jsonify(result), 200

#Autenticacion.
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    print(email)
    user = User.query.filter_by(email=email).first() #Valida que existe un usuario en la base de datos que estoy manejando
    print(user)
    if email != user.email or password != user.password:
        return jsonify({"msg": "Incorrect username or password"}), 401    
    
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    print(current_user)
    return jsonify(logged_in_as=current_user), 200

if __name__ == "__main__":
    api.run()
