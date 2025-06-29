from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import json

app = Flask(__name__)
CORS(app)
DATABASE = "users.db"

# Hilfsfunktion zum Datenbankzugriff
def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# Beim Start die User-Tabelle anlegen (falls nicht vorhanden)
def init_db():
    with get_db() as db:
        db.execute(
            '''CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                password TEXT,
                selected_places TEXT
            )'''
        )
init_db()

# Nutzer REGISTRIEREN (Dummy, kein echtes Passwort-Hashing!)
@app.route('/users/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({"error": "Username & password required"}), 400

    try:
        with get_db() as db:
            db.execute("INSERT INTO users (username, password, selected_places) VALUES (?, ?, ?)", 
                       (username, password, ""))
        return jsonify({"message": "User registered successfully"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "User already exists"}), 409

# Nutzer ANMELDEN (Dummy-Login, ohne Session/Cookies!)
@app.route('/users/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    with get_db() as db:
        user = db.execute("SELECT * FROM users WHERE username=? AND password=?", 
                          (username, password)).fetchone()
        if user:
            return jsonify({"message": "Login successful"}), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401
        
@app.route('/users/<username>/places', methods=['GET'])
def get_places(username):
    with get_db() as db:
        user = db.execute("SELECT selected_places FROM users WHERE username=?", (username,)).fetchone()
        if not user:
            return jsonify({"error": "User not found"}), 404
        if not user["selected_places"]:
            places = []
        else:
            places = json.loads(user["selected_places"])
        return jsonify({"places": places}), 200

@app.route('/users/<username>/places', methods=['POST'])
def save_places(username):
    data = request.get_json()
    places = data.get('places', [])
    if not isinstance(places, list):
        return jsonify({"error": "Places must be a list"}), 400
    with get_db() as db:
        user = db.execute("SELECT id FROM users WHERE username=?", (username,)).fetchone()
        if not user:
            return jsonify({"error": "User not found"}), 404
        db.execute(
            "UPDATE users SET selected_places=? WHERE username=?",
            (json.dumps(places), username)
        )
    return jsonify({"message": "Places saved"}), 200

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
