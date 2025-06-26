from flask import Blueprint, jsonify

main = Blueprint("main", __name__)

@main.route("/users", methods=["GET"])
def get_users():
    return jsonify({
        "users": [
            {"name": "Alice", "email": "alice@example.com"},
            {"name": "Bob", "email": "bob@example.com"}
        ]
    })
