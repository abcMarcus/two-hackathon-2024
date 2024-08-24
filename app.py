"""
Entry point of the bubbles backend.

everything else is the the /backend dir.
"""

from backend import app, socketio

if __name__ == "__main__":
    socketio.run(app, 
                 port="38433", 
                 host="0.0.0.0",
                 debug=True)
