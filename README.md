# TOS Privacy Risk Analysis Tool

A tool to analyze Terms of Service and Privacy Policy documents for potential privacy risks using NLP and BERT models to identify potentially concerning privacy-related statements.

## Features
- Semantic analysis of privacy-related statements
- Risk level categorization (High, Medium, Low)
- Support for large text documents with chunking
- Sentiment analysis for context awareness
- GUI interface for easy document analysis
- Automatic risk scoring based on multiple factors

## Prerequisites

- Python 3.8+ (3.12 recommended)
- At least 4GB RAM (8GB recommended for BERT model)
- GUI-capable system (for the interface)

## Installation & Running

### Option 1: Using Jupyter Notebook (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/RZhu04/TOS-privacy-risk-analysis-tool
cd TOS-privacy-risk-analysis-tool
```

2. Open and run the provided Jupyter notebook:
```bash
jupyter notebook RUN_PROGRAM_SUBMISSION.ipynb
```

3. Run each cell in sequence. The notebook will:
   - Install required packages
   - Download necessary models
   - Start the server
   - Launch the GUI interface

### Option 2: Manual Installation

1. Clone the repository:
```bash
git clone https://github.com/RZhu04/TOS-privacy-risk-analysis-tool
cd TOS-privacy-risk-analysis-tool
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Download required models:
```bash
python -m spacy download en_core_web_trf
python -m spacy download en_core_web_sm
```

4. Start the server:
```bash
python src/server.py
```

5. In a separate terminal, launch the GUI:
```bash
python src/GUI.py
```

## Input Data

Place your Terms of Service or Privacy Policy text files in the `cleanedTOS/` directory. 
- Default test file: `cleanedTOS/sample_policy.txt` (created automatically)
- Supported formats: `.txt` files
- UTF-8 encoding recommended

## Risk Analysis

The tool analyzes text and categorizes findings into three risk levels based on multiple factors:

### Risk Levels
- High Risk (> 0.8)
- Medium Risk (0.5 - 0.8)
- Low Risk (0.0 - 0.5)

### Analysis Factors
- Semantic similarity to known privacy patterns
- Presence of sensitive entities (personal info, locations, etc.)
- Sentiment analysis
- Context awareness
- Presence of privacy-positive terms
- Negation detection

### Example Output
```json
{
  "medium_risk": [
    {
      "text": "We collect information about your usage patterns",
      "pattern": "we collect your personal information",
      "similarity_score": 0.67,
      "context": "surrounding text for context",
      "sentiment": -0.1,
      "entity_count": 1,
      "sensitive_keywords": true
    }
  ]
}
```

## Project Structure

```
├── src/
│   ├── server.py      # Main server file
│   ├── GUI.py         # Graphical user interface
│   ├── nlp_pipeline.py # NLP processing logic
│   └── main.py        # Flask application and API endpoints
├── cleanedTOS/        # Input text files
├── RUN_PROGRAM_SUBMISSION.ipynb  # Jupyter notebook for easy setup
└── requirements.txt   # Python dependencies
```
