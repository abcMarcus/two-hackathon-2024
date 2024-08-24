from flask import Flask 
from flask_socketio import SocketIO 
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)
app.secret_key = 'the random string'

socketio = SocketIO(app)

# import backend.socket_routes, main.routes
import backend.routes, backend.socket
