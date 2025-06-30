from flask import Blueprint, jsonify, request

main = Blueprint("main", __name__)

@main.route("/")
def home():
    return "Hallo Welt!"
@main.route("/recommendations", methods=["POST"])
def get_recommendations():
    data = request.get_json(force=True)
    temperature = data.get("temperature")
    duration = data.get("duration")
    budget = data.get("budget")

    recommendations = []
    if temperature == "warm":
        recommendations.append({"name": "Barcelona", "reason": "Warm & cultural", "budget": budget})
    elif temperature == "cold":
        recommendations.append({"name": "Reykjavik", "reason": "Cold & nature", "budget": budget})
    if budget == "high":
        recommendations.append({"name": "Tokyo", "reason": "High-budget adventure", "budget": budget})

    return jsonify({"recommendations": recommendations})

