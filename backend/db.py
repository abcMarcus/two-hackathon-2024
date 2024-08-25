import os
import json
import bcrypt
import csv
from datetime import datetime, timedelta
from math import radians, cos, sin, sqrt, atan2

from backend.relevance_calculator import calculate_interest_compatibility

DB_DIR = "DB"

if not os.path.exists(DB_DIR):
    os.makedirs(DB_DIR)


def save_user(user_data):
    username = user_data.get("username")
    user_file = os.path.join(DB_DIR, f"{username}.json")

    if os.path.exists(user_file):
        return False, "User already exists"

    with open(user_file, "w") as f:
        json.dump(user_data, f)

    return True, "User created successfully"


def load_user(username):
    user_file = os.path.join(DB_DIR, f"{username}.json")

    if not os.path.exists(user_file):
        return None

    with open(user_file, "r") as f:
        return json.load(f)


def hash_password(password):
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")


def check_password(stored_password, provided_password):
    if not stored_password or not provided_password:
        return False
    return bcrypt.checkpw(
        provided_password.encode("utf-8"), stored_password.encode("utf-8")
    )


def update_location(username, latitude, longitude, ttl_minutes=60):
    user_file = os.path.join(DB_DIR, f"{username}.json")

    if not os.path.exists(user_file):
        return False, "User does not exist"

    with open(user_file, "r") as f:
        user_data = json.load(f)

    end_time = datetime.now() + timedelta(minutes=ttl_minutes)
    end_time_str = end_time.strftime("%Y-%m-%d %H:%M:%S")

    user_data["last_location"]["Latitude"] = latitude
    user_data["last_location"]["Longitude"] = longitude
    user_data["last_location"]["end_time"] = end_time_str

    with open(user_file, "w") as f:
        json.dump(user_data, f)

    return True, "Location updated successfully"


def check_ttl_and_clear(user_file) -> bool:
    if not os.path.exists(user_file):
        return False

    with open(user_file, "r") as f:
        user_data = json.load(f)

    end_time_str = user_data["last_location"].get("end_time")
    if not end_time_str:
        return False

    end_time = datetime.strptime(end_time_str, "%Y-%m-%d %H:%M:%S")

    if datetime.now() > end_time:
        user_data["last_location"]["Latitude"] = 0
        user_data["last_location"]["Longitude"] = 0
        user_data["last_location"]["end_time"] = None

        with open(user_file, "w") as f:
            json.dump(user_data, f)

        return True

    return False


def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6371.0  # Earth radius in kilometers

    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c


def get_nearby_users(username, distance_km):
    user_file = os.path.join(DB_DIR, f"{username}.json")

    if not os.path.exists(user_file):
        return [], "User does not exist"

    with open(user_file, "r") as f:
        user_data = json.load(f)

    user_lat = user_data["last_location"]["Latitude"]
    user_lon = user_data["last_location"]["Longitude"]
    user_interest = user_data["interest"]

    nearby_users = []

    for other_user_file in os.listdir(DB_DIR):
        if other_user_file == f"{username}.json":
            print("own")
            continue

        if check_ttl_and_clear(other_user_file):
            print("cleared")
            continue

        with open(os.path.join(DB_DIR, other_user_file), "r") as f:
            try:
                other_user_data = json.load(f)
            except json.decoder.JSONDecodeError:
                print("error json on:", user_file)
                continue

        other_lat = other_user_data["last_location"]["Latitude"]
        other_lon = other_user_data["last_location"]["Longitude"]
        other_interest = other_user_data["interest"]

        if other_lat == 0 and other_lon == 0:
            continue

        dist = calculate_distance(user_lat, user_lon, other_lat, other_lon)

        if dist <= distance_km:
            interest_score = calculate_interest_compatibility(
                user_interest, other_interest
            )
            print(f"{dist=}, {interest_score=}")
            nearby_users.append((other_user_file.split('.')[0], other_user_data, interest_score))


    print("nearby_users: ", nearby_users)
    nearby_users.sort(key=lambda x: x[2], reverse=True)
    nearby_users = nearby_users[:5]

    nearby_users = [{"username": usrname, "fullname": usr['fullname'], "interest": usr['interest']} for usrname, usr, _ in nearby_users]

    print("nearby_users filtered: ", nearby_users)

    return nearby_users, "Nearby users retrieved"


def get_message_filename(user1, user2):
    """Generate a lexicographically ordered filename for two users."""
    if user1 > user2:
        user1, user2 = user2, user1
    return os.path.join(DB_DIR, f"{user1}+{user2}.csv")


def save_message(sender, recipient, message):
    """Save a message with timestamp to a CSV file."""
    filename = get_message_filename(sender, recipient)
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    with open(filename, "a", newline="") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([timestamp, sender, recipient, message])


def get_messages(user1, user2, latest=False):
    """Retrieve messages between two users, optionally return only the latest message."""
    filename = get_message_filename(user1, user2)
    if not os.path.exists(filename):
        return []

    messages = []
    with open(filename, "r") as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            messages.append(row)

    if latest:
        return [messages[-1]] if messages else []
    return messages
