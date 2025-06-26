from flask import Blueprint, jsonify, request

main = Blueprint("main", __name__)

@main.route("/")
def home():
    return "Hallo Welt!"
@main.route("/recommendations", methods=["POST"])
def get_recommendations():
    data = request.json
    temperature = data.get("temperature")
    duration = data.get("duration")
    budget = data.get("budget")

    recommendations = []
    if temperature == "warm":
        recommendations.append({"location": "Barcelona", "reason": "Warm & cultural", "budget": budget})
    elif temperature == "cold":
        recommendations.append({"location": "Reykjavik", "reason": "Cold & nature", "budget": budget})
    if budget == "high":
        recommendations.append({"location": "Tokyo", "reason": "High-budget adventure", "budget": budget})

    return jsonify({"recommendations": recommendations})