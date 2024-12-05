import tkinter as tk
from tkinter import ttk, messagebox
from pathlib import Path
import os
import sys

# Add the project root directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import from client instead of test since it has the analyze_text function
from client import analyze_text

def list_available_policies(directory):
    """List all available privacy policies in the directory"""
    policies = []
    for file in Path(directory).glob('*.txt'):
        policies.append(file.stem)
    return sorted(policies)

def load_policy_content(directory, policy_name):
    """Load the content of the selected policy"""
    file_path = Path(directory) / f"{policy_name}.txt"
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

def analyze_policy(policy_content):
    """Analyze the policy content and return results"""
    return analyze_text(policy_content)

def on_search():
    """Search for policies matching the search term"""
    search_term = search_var.get().lower()
    matching_policies = [p for p in all_policies if search_term in p.lower()]
    policy_listbox.delete(0, tk.END)
    for policy in matching_policies:
        policy_listbox.insert(tk.END, policy)

def calculate_total_risk(results):
    """Calculate weighted average risk score"""
    weights = {
        'high_risk': 1,
        'medium_risk': 0.5,
        'low_risk': 0.3
    }
    
    # Count findings for each risk level
    counts = {
        'high_risk': len(results['high_risk']),
        'medium_risk': len(results['medium_risk']),
        'low_risk': len(results['low_risk'])
    }
    
    # Calculate total findings
    total_findings = sum(counts.values())
    
    if total_findings == 0:
        return 0.0
    
    # Calculate weighted score
    weighted_sum = sum(counts[level] * weights[level] for level in weights)
    
    # Normalize by total findings
    total_risk = weighted_sum / total_findings * 100
    
    return total_risk

def on_analyze():
    """Analyze the selected policy when Analyze button is clicked"""
    if not policy_listbox.curselection():
        messagebox.showwarning("Warning", "Please select a policy to analyze first.")
        return
        
    selected_policy = policy_listbox.get(policy_listbox.curselection())
    
    # Show loading message
    result_text.delete(1.0, tk.END)
    result_text.insert(tk.END, "Analyzing... Please wait.\n")
    root.update()
    
    try:
        policy_content = load_policy_content(policy_dir, selected_policy)
        results = analyze_policy(policy_content)
        
        # Calculate total risk
        total_risk = calculate_total_risk(results)
        
        # Display results in the text area
        result_text.delete(1.0, tk.END)
        result_text.insert(tk.END, f"Analysis Results for {selected_policy}:\n\n")
        
        # Display total risk score
        result_text.insert(tk.END, f"Total Risk Score: {total_risk:.1f}%\n")
        result_text.insert(tk.END, "Based on weights: High (50%), Medium (30%), Low (20%)\n\n")
        
        # Display finding counts
        result_text.insert(tk.END, "Summary:\n")
        for risk_level in ['high_risk', 'medium_risk', 'low_risk']:
            count = len(results[risk_level])
            result_text.insert(tk.END, f"{risk_level.upper()}: {count} findings\n")
        
        # Display findings
        for risk_level in ['high_risk', 'medium_risk', 'low_risk']:
            if results[risk_level]:
                result_text.insert(tk.END, f"{risk_level.upper()}:\n")
                for finding in results[risk_level]:
                    result_text.insert(tk.END, f"\n- Text: {finding['text']}\n")
                    result_text.insert(tk.END, f"  Pattern: {finding['pattern']}\n")
                    if 'similarity_score' in finding:
                        result_text.insert(tk.END, f"  Score: {finding['similarity_score']:.2f}\n")
                result_text.insert(tk.END, "\n")
    
    except Exception as e:
        result_text.delete(1.0, tk.END)
        result_text.insert(tk.END, f"Error analyzing policy: {str(e)}")

def create_gui():
    """Create the main GUI window"""
    global root, search_var, policy_listbox, result_text, all_policies
    
    # Create the root window first
    root = tk.Tk()
    root.title("TOS Privacy Analysis Tool")
    root.geometry("1000x800")
    
    # Initialize variables after creating root
    search_var = tk.StringVar()
    
    # Create main content frame
    content_frame = ttk.Frame(root)
    content_frame.pack(pady=10, padx=10, fill=tk.BOTH, expand=True)
    
    # Left side frame (Policy list and search)
    left_frame = ttk.Frame(content_frame)
    left_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=(0, 5))
    
    # Search bar at top of left frame
    search_frame = ttk.Frame(left_frame)
    search_frame.pack(fill=tk.X, pady=(0, 10))
    
    search_label = ttk.Label(search_frame, text="Search Company:")
    search_label.pack(side=tk.LEFT, padx=5)
    
    search_entry = ttk.Entry(search_frame, textvariable=search_var)
    search_entry.pack(side=tk.LEFT, padx=5, fill=tk.X, expand=True)
    
    search_button = ttk.Button(search_frame, text="Search", command=on_search)
    search_button.pack(side=tk.LEFT, padx=5)
    
    # Policy list below search
    list_label = ttk.Label(left_frame, text="Available Policies:")
    list_label.pack(pady=(0, 5))
    
    policy_listbox = tk.Listbox(left_frame, height=15)
    policy_listbox.pack(fill=tk.BOTH, expand=True)
    
    # Populate listbox with all policies
    for policy in all_policies:
        policy_listbox.insert(tk.END, policy)
    
    # Analyze button below policy list
    analyze_button = ttk.Button(left_frame, text="Analyze Selected Policy", command=on_analyze)
    analyze_button.pack(pady=10)

    # Right side frame (Results)
    right_frame = ttk.Frame(content_frame)
    right_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=(5, 0))
    
    result_label = ttk.Label(right_frame, text="Analysis Results:")
    result_label.pack(pady=(0, 5))
    
    # Add scrollbar to result text
    result_scroll = ttk.Scrollbar(right_frame)
    result_scroll.pack(side=tk.RIGHT, fill=tk.Y)
    
    result_text = tk.Text(right_frame, yscrollcommand=result_scroll.set, wrap=tk.WORD)
    result_text.pack(fill=tk.BOTH, expand=True)
    result_scroll.config(command=result_text.yview)

    root.mainloop()

if __name__ == "__main__":
    # Directory containing the cleaned TOS files
    policy_dir = Path("cleanedTOS")
    
    if not policy_dir.exists():
        messagebox.showerror("Error", "cleanedTOS directory not found!")
        sys.exit(1)
    
    # Initialize policies list
    all_policies = list_available_policies(policy_dir)
    
    # Create and run the GUI
    create_gui()