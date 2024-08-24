from flask import Flask 
from flask_socketio import SocketIO 

app = Flask(__name__)

socketio = SocketIO(app)

# import backend.socket_routes, main.routes
import backend.routes
