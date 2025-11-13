# 🧠 Eunoia - Mental Health Support Chatbot
![Python](https://img.shields.io/badge/Python-3.7+-blue?style=flat-square&logo=python)
![Flask](https://img.shields.io/badge/Flask-2.0+-black?style=flat-square&logo=flask)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-1.5_Flash-orange?style=flat-square&logo=google)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

## 📖 Description

Eunoia is an innovative, compassionate, and highly sophisticated mental health support chatbot meticulously crafted with Flask and powered by Google's cutting-edge Gemini AI. This groundbreaking application delivers an intuitive, user-friendly web interface for individuals seeking comprehensive mental health resources and empathetic support through seamless conversational AI interactions.

## ✨ Features

- **🤖 Compassionate AI Responses**: Leverages Google's Gemini 1.5 Flash model for empathetic and helpful mental health conversations
- **🌐 Web-Based Interface**: Clean, responsive web interface for easy access
- **💬 Real-Time Chat**: Instant messaging capabilities with persistent chat history
- **🧘 Mental Health Focused**: Specialized prompts designed for mental wellness support
- **🔒 Secure API Integration**: Environment-based configuration for API keys

## 📸 Screenshots

*Here are some screenshots showcasing the Eunoia mental health chatbot application:*

### Welcome Screen
![Welcome Screen](screenshots/welcome_screen.png)

### Chatbot Interface
![Chatbot Interface](screenshots/chatbot-interface.png)

### Wellness Tools
![Wellness Tools](screenshots/wellnesss_tools.png)

### Contact Page
![Contact Page](screenshots/contact.png)
![Contact Page Alternative](screenshots/contact1.png)

## Prerequisites

- Python 3.7 or higher
- Google Gemini API key
- pip (Python package manager)

## Installation

1. **Clone the repository** (if applicable) or ensure you have the project files in your directory.

2. **Install required dependencies**:
   ```bash
   pip install flask google-generativeai python-dotenv
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory
   - Add your Google Gemini API key:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```
   - Obtain an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Usage

1. **Run the Flask application**:
   ```bash
   python app.py
   ```

2. **Access the chatbot**:
   - Open your web browser and navigate to `http://localhost:5000`
   - Start chatting with Eunoia for mental health support

## Technologies Used

- **Backend**: Flask (Python web framework)
- **AI Model**: Google Gemini 1.5 Flash
- **Frontend**: HTML, CSS, JavaScript
- **Environment Management**: python-dotenv

## Notes

- Ensure your `.env` file is not committed to version control for security reasons
- The chatbot is designed to provide support and resources, not professional medical advice
- For production deployment, consider using a WSGI server like Gunicorn instead of Flask's built-in development server

## Contributing

Contributions to improve Eunoia are welcome. Please ensure any changes align with the compassionate and supportive nature of the application.

## License

[Add appropriate license information here]
