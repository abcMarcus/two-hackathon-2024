"""
define the api end points.

Mostly handle user location
"""
import os 
import json

from flask import request, jsonify, send_file

from backend import app
import backend.db as db

@app.route('/', methods=['GET'])
def index():
    return send_file('index.html')

@app.route('/api/create_user', methods=['POST'])
def create_user():
    data = request.json

    username = data.get('username')
    fullname = data.get('fullname')
    interest = data.get('interest')
    password = data.get('password')

    if not username or not fullname or not interest or not password:
        return jsonify({"error": "Missing required fields"}), 400

    hashed_password = db.hash_password(password)

    user_data = {
        "username": username,
        "fullname": fullname,
        "interest": interest,
        "password": hashed_password,
        "last_location": {
            "Latitude": 0,
            "Longitude": 0,
            "end_time": None
        }
    }

    success, message = db.save_user(user_data)

    if not success:
        return jsonify({"error": message}), 400

    return jsonify({"message": message}), 201

@app.route('/api/verify_login', methods=['POST'])
def verify_login():
    data = request.json

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Missing required fields"}), 400

    user_data = db.load_user(username)

    if not user_data:
        return jsonify({"error": "Invalid username or password"}), 400

    stored_password = user_data.get('password')

    if db.check_password(stored_password, password):
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 400

@app.route('/api/update_location', methods=['POST'])
def update_location():
    data = request.json

    username = data.get('username')
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    ttl = data.get('ttl', 60)

    if not username or latitude is None or longitude is None:
        return jsonify({"error": "Missing required fields"}), 400

    success, message = db.update_location(username, latitude, longitude, ttl)

    if not success:
        return jsonify({"error": message}), 400

    return jsonify({"message": message}), 200

@app.route('/api/getnearby', methods=['GET'])
def get_nearby():
    username = request.args.get('username')
    distance_km = float(request.args.get('distance_km', 1.0))

    if not username:
        return jsonify({"error": "Missing required parameter: username"}), 400

    db.check_ttl_and_clear(username)

    nearby_users, message = db.get_nearby_users(username, distance_km)

    return jsonify({"nearby_users": nearby_users, "message": message}), 200

@app.route('/api/get_all_users', methods=['GET'])
def get_all_users():
    users_data = []

    for user_file in os.listdir(db.DB_DIR):
        with open(os.path.join(db.DB_DIR, user_file), 'r') as f:
            user_data = json.load(f)
            users_data.append(user_data)
    
    return jsonify(users_data), 200

