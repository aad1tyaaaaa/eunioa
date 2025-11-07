from flask import Flask, render_template, request, jsonify
import os
import google.generativeai as genai
from dotenv import load_dotenv

app = Flask(__name__)

# Configure Gemini API
load_dotenv()  # Load environment variables from .env file

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))  # Get API key from environment variables

# Create the model
generation_config = {
  "temperature": 0.3,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
)

# Initialize chat session
chat_session = model.start_chat(history=[
    {
      "role": "user",
      "parts": ["You are **Eunoia**, a compassionate mental health support chatbot..."],
    },
    {
      "role": "model",
      "parts": ["Hi, I'm Eunoia. I'm here to listen and share mental health resources..."],
    }
])

@app.route('/')
def home():
    return render_template('chatbot.html', extra_stylesheet="{{ url_for('static', filename='chatbot.css') }}")

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        if not data or 'message' not in data or not data['message'].strip():
            return jsonify({'error': 'Message is required'}), 400
            
        user_message = data['message'].strip()
        response = chat_session.send_message(user_message)
        return jsonify({'response': response.text})
        
    except Exception as e:
        return jsonify({'error': 'An error occurred processing your message'}), 500

if __name__ == '__main__':
    app.run(debug=True)
