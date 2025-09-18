"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from api.models import db, User

api = Blueprint("api", __name__)

@api.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email", "").lower().strip()
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Faltan datos"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Usuario ya existe"}), 409

    user = User(email=email, password=password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado"}), 201


@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email", "").lower().strip()
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or user.password != password:
        return jsonify({"msg": "Credenciales inválidas"}), 401

    token = create_access_token(identity=user.id, expires_delta=timedelta(hours=8))
    return jsonify({"access_token": token, "email": user.email}), 200


@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({"msg": f"Hola {user.email}, estás autenticado"}), 200