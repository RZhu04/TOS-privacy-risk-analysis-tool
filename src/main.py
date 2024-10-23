from nlp_pipeline import analyze_TOS, generate_patterns


def main():
    file_path = "../data/GoogleTOS.txt"
    base_patterns = ["third parties", "data sharing", "indefinitely retain", "third-party"]
    texts = []
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            text = file.read()
            texts.append(text)
            patterns = generate_patterns(texts, base_patterns)
            flagged_clauses = analyze_TOS(text, patterns)
            if flagged_clauses:
                print("Flagged Clauses:")
                for clause in flagged_clauses:
                    print(f"- {clause}")
                print("end of flagged clauses")
            else:
                print("No concerning clauses found.")
    except FileNotFoundError:
        print("File not found. Please provide a valid file path.")


if __name__ == "__main__":
    main()
    k = input("press close to exit")
