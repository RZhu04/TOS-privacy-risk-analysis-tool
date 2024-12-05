import os
from pathlib import Path
import shutil
import re

def clean_company_name(filename):
    """Extract company name from filename (everything before first underscore)"""
    # Split on first underscore and take the first part
    company_name = filename.split('_')[0]
    # Clean any remaining special characters
    company_name = re.sub(r'[^\w\s-]', '', company_name)
    return company_name.lower()

def determine_document_type(content):
    """Determine if the document is a TOS or Privacy Policy"""
    # Convert content to lowercase for case-insensitive matching
    content_lower = content.lower()
    
    # Define keywords for each type
    privacy_keywords = ['privacy policy', 'privacy notice', 'privacy statement']
    
    # Check for Privacy Policy keywords
    for keyword in privacy_keywords:
        if keyword in content_lower:
            return 'PrivacyPolicy'
            
    # Default to TOS if not privacy policy
    return 'TOS'

def copy_and_rename_files(source_dir, dest_dir):
    """Copy files to new directory with cleaned names"""
    source_dir = Path(source_dir)
    dest_dir = Path(dest_dir)
    
    # Create destination directory if it doesn't exist
    dest_dir.mkdir(parents=True, exist_ok=True)
    
    # Create a log file in the destination directory
    log_file = dest_dir / 'rename_log.txt'
    with open(log_file, 'w', encoding='utf-8') as log:
        log.write("File Renaming Log\n")
        log.write("================\n\n")
        
        for file_path in source_dir.glob('*.txt'):
            try:
                # Skip the log file itself
                if file_path.name == 'rename_log.txt':
                    continue
                    
                # Read file content
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                # Extract company name from filename
                company_name = clean_company_name(file_path.stem)
                doc_type = determine_document_type(content)
                
                # Create new filename
                new_filename = f"{company_name}_{doc_type}.txt"
                new_path = dest_dir / new_filename
                
                # Handle duplicate filenames
                counter = 1
                while new_path.exists():
                    new_filename = f"{company_name}_{doc_type}_{counter}.txt"
                    new_path = dest_dir / new_filename
                    counter += 1
                
                # Copy the file
                shutil.copy2(file_path, new_path)
                
                # Log the change
                log.write(f"Original: {file_path.name}\n")
                log.write(f"New: {new_filename}\n")
                log.write("-" * 50 + "\n")
                
                print(f"Copied: {file_path.name} -> {new_filename}")
                
            except Exception as e:
                error_msg = f"Error processing {file_path.name}: {str(e)}"
                print(error_msg)
                log.write(f"ERROR: {error_msg}\n")
                log.write("-" * 50 + "\n")

def main():
    # Define source and destination directories
    source_dir = Path("rawTOS")
    dest_dir = Path("cleanedTOS")
    
    if not source_dir.exists():
        print(f"Error: Source directory '{source_dir}' not found")
        return
    
    print(f"Processing files from {source_dir} to {dest_dir}...")
    copy_and_rename_files(source_dir, dest_dir)
    print("\nDone! Check cleanedTOS/rename_log.txt for details.")

if __name__ == "__main__":
    main()