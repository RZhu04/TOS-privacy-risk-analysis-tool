import pandas as pd
import requests
import json
import time
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

def convert_csv_to_text(csv_path):
    """
    Converts a CSV file containing privacy policy/TOS annotations into a single text document.
    Assumes CSV has numbered segments that need to be ordered correctly.
    """
    try:
        # Read CSV file
        df = pd.read_csv(csv_path)
        
        # Sort by the first column (segment number) to ensure correct order
        df = df.sort_values(by=df.columns[0])
        
        # Extract unique text segments (column index 3 contains the text)
        # Remove duplicates while preserving order
        text_segments = df.iloc[:, 3].drop_duplicates().tolist()
        
        # Combine all segments with newlines between them
        combined_text = '\n\n'.join(text_segments)
        
        return combined_text
        
    except Exception as e:
        print(f"Error converting CSV to text: {str(e)}")
        return None

