from flask import Flask, request, jsonify
from flask_cors import CORS
from nlp_pipeline import comprehensive_phrase_matching

app = Flask(__name__)
CORS(app)

@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        data = request.json
        text = data.get("text", "")
        if not text:
            return jsonify({"error": "No text provided"}), 400

        print(f"\nAnalyzing text...")
        print(f"Text length: {len(text)} characters\n")

        # More specific privacy-related patterns
        base_patterns = [
            # Data Collection
            "we collect your personal information",
            "we gather data about you",
            "information we collect automatically",
            "we track your usage",
            
            # Data Sharing
            "we share your information with third parties",
            "we may disclose your data",
            "information shared with partners",
            "data transferred to third parties",
            
            # Data Storage
            "we store your information",
            "data retention period",
            "how we keep your data",
            "information we maintain",
            
            # Data Usage
            "how we use your information",
            "we process your data",
            "use of collected information",
            "purposes for data processing"
        ]

        # Get matches
        grouped_results = comprehensive_phrase_matching([text], base_patterns)
        
        # Return the grouped results directly
        return jsonify(grouped_results)

    except Exception as e:
        print(f"Error in analyze endpoint: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)