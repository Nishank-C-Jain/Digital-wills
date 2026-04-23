import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import json

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

def analyze_will_content(text):
    if not GEMINI_API_KEY:
        # Mock response if no API key
        return {
            "riskScore": 15,
            "sentiment": "Neutral",
            "flags": ["No API key provided, mock analysis."]
        }

    try:
        model = genai.GenerativeModel('gemini-1.5-pro-latest')
        
        prompt = f"""
        You are an expert legal AI analyzing a digital will.
        Review the following will text and evaluate it for:
        1. Emotional sentiment (Positive, Neutral, or Negative).
        2. Signs of coercion, emotional distress, or undue influence.
        3. Unusual or suspicious beneficiary designations (e.g. leaving everything to a recently met person, cutting out immediate family abruptly, if context is provided).
        
        Generate a risk score from 0-100, where 0 is perfectly normal and 100 is highly suspicious/fraudulent/coerced.
        If the score is above 50, provide specific flags/warnings.
        
        Return ONLY a valid JSON object with this exact structure:
        {{
            "riskScore": (number 0-100),
            "sentiment": "(Positive, Neutral, or Negative)",
            "flags": ["warning 1", "warning 2", ...] (empty array if no flags)
        }}
        
        Will Text:
        {text}
        """
        
        response = model.generate_content(prompt)
        # Parse JSON from response text. Sometimes LLMs wrap in ```json ... ```
        response_text = response.text.strip()
        if response_text.startswith("```json"):
            response_text = response_text[7:-3].strip()
        elif response_text.startswith("```"):
            response_text = response_text[3:-3].strip()
            
        return json.loads(response_text)
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return {
            "riskScore": 50,
            "sentiment": "Unknown",
            "flags": ["AI Analysis failed due to an internal error."]
        }

@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.json
    text = data.get('content', '')
    
    if not text:
        return jsonify({"error": "No content provided"}), 400
        
    analysis_result = analyze_will_content(text)
    return jsonify(analysis_result)

if __name__ == '__main__':
    app.run(port=5001, debug=True)
