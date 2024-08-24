from flask_socketio import emit, join_room, leave_room
from flask import request, session
from socketio.exceptions import ConnectionRefusedError
from backend import socketio
import backend.db as db

# Dictionary to track online users
online_users = {}

@socketio.on('connect')
def connect():
    username = session.get("username")
    if not username:
        print("kicked, no username in session")
        raise ConnectionRefusedError("Invalid username")

    # Add the user to the online users dictionary
    online_users[username] = request.sid
    emit('connect')

@socketio.on('disconnect')
def disconnect():
    username = session.get("username")
    if username in online_users:
        # Remove the user from the online users dictionary
        del online_users[username]

@socketio.on('message')
def handle_message(data):
    print("message recived")
    username = session.get("username")
    if not username:
        return emit('error', {"error": "User not authenticated"})

    target_username = data.get('target_username')
    message = data.get('message')

    if not target_username or not message:
        return emit('error', {"error": "Missing target_username or message"})

    # Save the message
    db.save_message(username, target_username, message)
    
    # Notify the target user if they are online
    print(f"{target_username=}, {online_users=}")
    if target_username in online_users:
        target_sid = online_users[target_username]
        socketio.emit('message_received', {"sender": username, "message": message}, room=target_sid)
        print("message received ping sent")

    emit('message_sent', {"message": "Message sent successfully"})

@socketio.on('get_message')
def handle_get_message(data):
    username = session.get("username")
    if not username:
        return emit('error', {"error": "User not authenticated"})

    target_username = data.get('target_username')
    latest = data.get('latest', False)

    if not target_username:
        return emit('error', {"error": "Missing target_username"})

    # Retrieve messages
    messages = db.get_messages(username, target_username, latest)
    print("get_message", messages)
    emit('messages', {"messages": messages})
    return messages

