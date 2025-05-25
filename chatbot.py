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

    if user_input in ["1", "introduction", "intro", "about"]:
        return knowledge["introduction"]
    elif user_input in ["2", "adha"]:
        return knowledge["packages"]["adha"]
    elif user_input in ["3", "sharm"]:
        return knowledge["packages"]["sharm"]
    elif user_input in ["4", "hours", "operation"]:
        return knowledge["operation_hours"]
    elif user_input in ["5", "agent", "contact"]:
        return knowledge["contact_agent"]
    else:
        return "🤔 I'm not sure I understand. Please ask about: 1. Introduction, 2. Adha, 3. Sharm, 4. Hours, 5. Agent"



# Chat route
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_input = data.get("question", "")
    response = get_response(user_input)
    return jsonify({"answer": response})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
