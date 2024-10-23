import spacy
from spacy.matcher import PhraseMatcher
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np


def load_nlp_model():
    nlp = spacy.load("en_core_web_sm")
    matcher = PhraseMatcher(nlp.vocab, attr="LOWER")
    return nlp, matcher

def generate_patterns(texts, base_terms):
    # Use TF-IDF to find terms similar to base_terms
    vectorizer = TfidfVectorizer().fit(texts)
    feature_names = vectorizer.get_feature_names_out()
    base_vectors = vectorizer.transform(base_terms)
    cosine_similarities = np.dot(vectorizer.transform(feature_names), base_vectors.T).toarray()

    similar_terms = set()
    for idx, term in enumerate(feature_names):
        if any(cosine_similarities[idx] > 0.2):  # Threshold for similarity
            similar_terms.add(term)
    return list(similar_terms)

def analyze_TOS(text, patterns):
    nlp, matcher = load_nlp_model()
    for pattern in patterns:
        matcher.add("RISK_PATTERNS", [nlp.make_doc(pattern)])
    doc = nlp(text)
    matches = matcher(doc)
    flagged_clauses = [doc[start:end].text for match_id, start, end in matches]
    return flagged_clauses
