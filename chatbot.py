from flask import Flask, request, jsonify
from flask_cors import CORS
import json

# Load Darazi knowledge base
with open('darazi_knowledge.json') as f:
    knowledge = json.load(f)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Enhanced keyword-based response function
def get_response(user_input):
    user_input = user_input.lower().strip()

    greetings = ["hi", "hello", "hey", "how are you", "what's up", "yo", "sup"]
    if any(greet in user_input for greet in greetings):
        return "👋 Hello! How can I assist you today?"

    # Handle numbers 1-5
    if user_input in ["1", "introduction", "intro", "about"]:
        return knowledge["introduction"]
    elif user_input in ["2", "adha", "adha package"]:
        return knowledge["packages"]["adha"]
    elif user_input in ["3", "sharm", "sharm package"]:
        return knowledge["packages"]["sharm"]
    elif user_input in ["4", "hours", "working hours", "operation"]:
        return knowledge["operation_hours"]
    elif user_input in ["5", "agent", "connect", "connect to agent", "help"]:
        return "📨 Connecting you to an agent... Please wait."

    return "🤔 I'm not sure I understand. Could you try rephrasing?"

# Chat route
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_input = data.get("question", "")
    response = get_response(user_input)
    return jsonify({"answer": response})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
