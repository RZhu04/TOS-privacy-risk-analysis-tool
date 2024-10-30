import requests
import json
import time
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

def create_session():
    session = requests.Session()
    retry_strategy = Retry(
        total=3,
        backoff_factor=1,
        status_forcelist=[500, 502, 503, 504]
    )
    adapter = HTTPAdapter(max_retries=retry_strategy)
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    return session

def analyze_text(text, chunk_size=5000):
    chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]
    
    all_results = {
        'high_risk': [],
        'medium_risk': [],
        'low_risk': []
    }
    
    session = create_session()
    total_chunks = len(chunks)
    
    for i, chunk in enumerate(chunks, 1):
        try:
            print(f"\nProcessing chunk {i}/{total_chunks}")
            
            response = session.post(
                "http://127.0.0.1:5000/analyze",
                json={"text": chunk},
                timeout=60
            )
            
            if response.status_code == 200:
                chunk_results = response.json()
                
                # Merge results, ensuring no duplicates
                for risk_level in all_results:
                    if risk_level in chunk_results:
                        for match in chunk_results[risk_level]:
                            # Only add if text is not already present
                            if not any(existing['text'] == match['text'] for existing in all_results[risk_level]):
                                all_results[risk_level].append(match)
                
                print(f"Found matches - High: {len(chunk_results['high_risk'])}, "
                      f"Medium: {len(chunk_results['medium_risk'])}, "
                      f"Low: {len(chunk_results['low_risk'])}")
                
            else:
                print(f"Error in chunk {i}: {response.status_code}")
                print(f"Response: {response.text}")
                
        except Exception as e:
            print(f"Error processing chunk {i}: {str(e)}")
            continue
    
    return all_results

def main():
    file_path = "data/GoogleTOS.txt"
    
    print("Reading file...")
    with open(file_path, "r", encoding="utf-8") as file:
        text = file.read()
    
    print(f"Text length: {len(text)} characters")
    start_time = time.time()
    
    try:
        results = analyze_text(text)
        
        print(f"\nAnalysis completed in {time.time() - start_time:.2f} seconds")
        print("\nAnalysis Summary:")
        for risk_level, findings in results.items():
            print(f"{risk_level}: {len(findings)} findings")
        
        # Print detailed findings
        print("\nDetailed findings:")
        for risk_level in ['high_risk', 'medium_risk', 'low_risk']:
            if results[risk_level]:
                print(f"\n{risk_level.upper()}:")
                for finding in results[risk_level]:
                    try:
                        print(f"\n- Text: {finding['text']}")
                        print(f"  Matched pattern: {finding['pattern']}")
                        if 'similarity_score' in finding:
                            print(f"  Score: {finding['similarity_score']:.2f}")
                        else:
                            print(f"  Score: N/A")
                    except KeyError as e:
                        print(f"Missing key in finding: {e}")
                        print(f"Raw finding data: {finding}")
    
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    main()
