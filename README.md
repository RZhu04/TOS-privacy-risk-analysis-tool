# TOS Privacy Risk Analysis Tool

A tool to analyze Terms of Service and Privacy Policy documents for potential privacy risks using NLP and BERT models to identify potentially concerning privacy-related statements.

## Features
- Semantic analysis of privacy-related statements
- Risk level categorization (High, Medium, Low)
- Support for large text documents with chunking
- Sentiment analysis for context awareness
- Automatic server reloading during development

## Prerequisites

- Python 3.8+
- Node.js (optional, for nodemon)
- At least 4GB RAM (for BERT model)

## Installation

1. Clone the repository:

```bash
git clone [[repository-url]](https://github.com/RZhu04/TOS-privacy-risk-analysis-tool)
cd TOS-privacy-risk-analysis-tool
```

2. Install Python dependencies:

```bash
pip install -r requirements.txt
```

3. Download required models:

```bash
python -m spacy download en_core_web_sm
python -m textblob.download_corpora
```

## Running the Application

### Option 1: Standard Python

1. Start the server:

```bash
python src/server.py
```

2. In a separate terminal, run the test script:

```bash
python src/test.py
```

### Option 2: Using Nodemon (Optional Development Tool)

If you want auto-restart capability during development:

1. Install nodemon globally:

```bash
npm install -g nodemon
```

2. Create a `nodemon.json` file in the project root:

```json
{
  "watch": ["src/"],
  "ext": ".py,.json",
  "ignore": ["__pycache__", "*.pyc"],
  "exec": "python src/server.py"
}
```

3. Start the server with nodemon:

```bash
nodemon server.py
```

3. In a separate terminal, run the test script:

```bash
python src/test.py
```

## Input Data

Place your Terms of Service or Privacy Policy text files in the `data/` directory. 
- Default test file: `data/GoogleTOS.txt`
- Supported formats: `.txt` files
- UTF-8 encoding recommended

## Output Format

The tool analyzes text and categorizes findings into three risk levels based on similarity scores:
- High Risk (> 0.7)
- Medium Risk (0.55 - 0.7)
- Low Risk (0.45 - 0.55)

Example output:
{
  "medium_risk": [
    {
      "text": "We collect information about your usage patterns",
      "pattern": "we collect your personal information",
      "similarity_score": 0.67
    }
  ]
}

## Project Structure

```
├── src/
│   ├── server.py      # Main server file
│   ├── main.py        # Flask application and API endpoints
│   ├── nlp_pipeline.py # NLP processing logic
│   └── test.py        # Test script
├── data/              # Input text files
├── package.json       # Node.js configuration
├── nodemon.json       # Nodemon configuration
└── requirements.txt   # Python dependencies
```
