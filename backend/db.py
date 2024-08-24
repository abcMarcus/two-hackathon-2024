import os
import json
import bcrypt
from datetime import datetime, timedelta
from math import radians, cos, sin, sqrt, atan2

DB_DIR = "DB"

if not os.path.exists(DB_DIR):
    os.makedirs(DB_DIR)

def save_user(user_data):
    username = user_data.get("username")
    user_file = os.path.join(DB_DIR, f"{username}.json")

    if os.path.exists(user_file):
        return False, "User already exists"

    with open(user_file, 'w') as f:
        json.dump(user_data, f)

    return True, "User created successfully"

def load_user(username):
    user_file = os.path.join(DB_DIR, f"{username}.json")
    
    if not os.path.exists(user_file):
        return None
    
    with open(user_file, 'r') as f:
        return json.load(f)

def hash_password(password):
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def check_password(stored_password, provided_password):
    if not stored_password or not provided_password:
        return False
    return bcrypt.checkpw(provided_password.encode('utf-8'), stored_password.encode('utf-8'))

def update_location(username, latitude, longitude, ttl_minutes=60):
    user_file = os.path.join(DB_DIR, f"{username}.json")
    
    if not os.path.exists(user_file):
        return False, "User does not exist"

    with open(user_file, 'r') as f:
        user_data = json.load(f)
    
    end_time = datetime.now() + timedelta(minutes=ttl_minutes)
    end_time_str = end_time.strftime("%Y-%m-%d %H:%M:%S")

    user_data['last_location']['Latitude'] = latitude
    user_data['last_location']['Longitude'] = longitude
    user_data['last_location']['end_time'] = end_time_str

    with open(user_file, 'w') as f:
        json.dump(user_data, f)

    return True, "Location updated successfully"

def check_ttl_and_clear(username):
    user_file = os.path.join(DB_DIR, f"{username}.json")
    
    if not os.path.exists(user_file):
        return False, "User does not exist"

    with open(user_file, 'r') as f:
        user_data = json.load(f)

    end_time_str = user_data['last_location'].get('end_time')
    if not end_time_str:
        return False, "No end time set"

    end_time = datetime.strptime(end_time_str, "%Y-%m-%d %H:%M:%S")
    
    if datetime.now() > end_time:
        user_data['last_location']['Latitude'] = 0
        user_data['last_location']['Longitude'] = 0
        user_data['last_location']['end_time'] = None

        with open(user_file, 'w') as f:
            json.dump(user_data, f)

        return True, "TTL passed, location data cleared"
    
    return False, "TTL not yet passed"

def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6371.0  # Earth radius in kilometers

    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c

def get_nearby_users(username, distance_km):
    user_file = os.path.join(DB_DIR, f"{username}.json")
    
    if not os.path.exists(user_file):
        return [], "User does not exist"

    with open(user_file, 'r') as f:
        user_data = json.load(f)
    
    user_lat = user_data['last_location']['Latitude']
    user_lon = user_data['last_location']['Longitude']

    nearby_users = []

    for other_user_file in os.listdir(DB_DIR):
        if other_user_file == f"{username}.json":
            continue
        
        with open(os.path.join(DB_DIR, other_user_file), 'r') as f:
            other_user_data = json.load(f)
        
        other_lat = other_user_data['last_location']['Latitude']
        other_lon = other_user_data['last_location']['Longitude']

        if other_lat == 0 and other_lon == 0:
            continue
        
        dist = calculate_distance(user_lat, user_lon, other_lat, other_lon)
        
        if dist <= distance_km:
            nearby_users.append(other_user_data['username'])
    
    return nearby_users, "Nearby users retrieved"

