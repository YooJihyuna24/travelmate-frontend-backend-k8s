from flask import Blueprint, jsonify

main = Blueprint("main", __name__)

@main.route("/")
def home():
    return "Hallo Welt!"

@main.route("/recommendations", methods=["GET"])
def get_recommendations():
    dummy_data = {
        "recommendations": [
            {"location": "Paris", "reason": "culture"},
            {"location": "Reykjavik", "reason": "nature"},
            {"location": "Seoul", "reason": "food"}
        ]
    }
    return jsonify(dummy_data)
