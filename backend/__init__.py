from flask import Flask 
from flask_socketio import SocketIO 
from flask_cors import CORS 

app = Flask(__name__)
# CORS(app, resources={r"/*":{"origins":"*"}})
CORS(app)
app.secret_key = 'the random string'

# socketio = SocketIO(app)

socketio = SocketIO(app, cors_allowed_origins="*")

# import backend.socket_routes, main.routes
import backend.routes, backend.socket
