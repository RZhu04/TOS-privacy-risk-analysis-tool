from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import spacy
import numpy as np
from textblob import TextBlob

# Global model instances
_nlp = None
_bert_model = None

def get_nlp_model():
    """Load spaCy model for sentence splitting, NER, and dependency parsing."""
    global _nlp
    if _nlp is None:
        try:
            print("Loading spaCy transformer model 'en_core_web_trf'...")
            _nlp = spacy.load("en_core_web_trf")
        except:
            print("Falling back to 'en_core_web_sm' due to missing transformer model.")
            _nlp = spacy.load("en_core_web_sm")
    return _nlp

def get_bert_model():
    """Load a better model for semantic similarity."""
    global _bert_model
    if _bert_model is None:
        print("Loading SentenceTransformer model 'all-mpnet-base-v2'...")
        _bert_model = SentenceTransformer('all-mpnet-base-v2')
        _bert_model.show_progress_bar = False
    return _bert_model

def analyze_sentiment(text):
    """Analyze sentiment and subjectivity of text using TextBlob."""
    blob = TextBlob(text)
    return blob.sentiment.polarity, blob.sentiment.subjectivity

def get_complete_sentence(sent):
    """Get complete sentence including content after colons."""
    text = sent.text.strip()
    if text.endswith(':'):
        # Look ahead for the next sentence
        next_sent = list(sent.doc[sent.end:].sents)
        if next_sent:
            text += ' ' + next_sent[0].text.strip()
    return text

def is_title(text):
    """
    Identify if a sentence is a title based on heuristics.
    """
    # Check capitalization (e.g., "Title Case")
    words = text.split()
    title_case = all(word.istitle() for word in words if word.isalpha())

    # Check for length
    short_length = len(words) <= 10  # Titles are usually short

    return title_case or short_length

def is_verb_negated(token):
    """
    Check if a verb token is negated by dependency relations.
    For example, "do not collect" -> "collect" is negated.
    """
    # A verb is considered negated if a negation dependency is attached to it or its aux/advmod.
    negation_deps = {'neg'}
    for child in token.children:
        if child.dep_ in negation_deps:
            return True
    return False

def detect_negation_of_key_concept(doc, keywords):
    """
    Detect if verbs related to certain key concepts (like 'collect', 'share', 'store') 
    are negated in the given doc. If any of the keywords appear as a verb or 
    are governed by a negation, return True.
    """
    for token in doc:
        if token.lemma_.lower() in keywords and token.pos_ == "VERB":
            if is_verb_negated(token):
                return True
    return False

def detect_sensitive_entities(doc):
    """
    Detect presence of entities that might indicate more sensitivity:
    For example: PERSON, ORG, GPE, EMAIL, LOC, DATE if related to personal info.
    """
    # Increase risk if these entity types appear since they can signal personal data.
    sensitive_entity_types = {"PERSON", "ORG", "GPE", "EMAIL", "NORP", "FAC", "LOC"}
    count = 0
    for ent in doc.ents:
        if ent.label_ in sensitive_entity_types:
            count += 1
    return count

def contains_sensitive_keywords(text):
    """
    Check for additional sensitive keywords that signal higher risk.
    """
    sensitive_terms = [
        "ssn", "social security number", "credit card", "financial info", 
        "billing information", "medical record", "health data", "biometric"
    ]
    text_lower = text.lower()
    return any(term in text_lower for term in sensitive_terms)

def count_privacy_positive_terms(context):
    """
    Count privacy-positive terms for a more nuanced weighting rather than binary check.
    """
    privacy_positive_terms = [
        'privacy', 'protect', 'secure', 'confidential', 
        'transparency', 'rights', 'consent'
    ]
    c = 0
    for term in privacy_positive_terms:
        c += context.lower().count(term)
    return c

def find_similar_phrases(text, patterns, bert_model, nlp):
    """Calculate similarity between a text and multiple patterns with refined scoring and entity checks."""
    try:
        doc = nlp(text)
        sentences = []
        contexts = []
        
        # Collect candidate sentences
        # Expand context window to 3 tokens before and after.
        for sent in doc.sents:
            # Skip if it's identified as a title

            clean_sent = get_complete_sentence(sent)

            if is_title(clean_sent):
                continue

            if 20 < len(clean_sent) < 700:
                start_idx = max(0, sent.start - 3)
                end_idx = min(len(doc), sent.end + 3)
                context = doc[start_idx:end_idx].text
                sentences.append(clean_sent)
                contexts.append(context)
        
        if not sentences:
            return []
        
        # Embed patterns and sentences
        sentence_embeddings = bert_model.encode(sentences, show_progress_bar=False)
        pattern_embeddings = bert_model.encode(patterns, show_progress_bar=False)
        
        # Calculate similarities
        similarities = cosine_similarity(sentence_embeddings, pattern_embeddings)
        
        # Prepare risk assessment keywords
        key_data_ops = ["collect", "gather", "share", "disclose", "store", "maintain", "use", "process"]
        
        matches = []
        
        for i, (sentence, context) in enumerate(zip(sentences, contexts)):
            # Analyze sentiment
            sentiment, subjectivity = analyze_sentiment(sentence)
            context_sentiment, _ = analyze_sentiment(context)

            # NER-based sensitivity
            sent_doc = nlp(sentence)
            entity_count = detect_sensitive_entities(sent_doc)
            sensitive_kw = contains_sensitive_keywords(sentence + " " + context)

            # Check negation using dependency parsing
            sentence_doc = nlp(sentence)
            negation = detect_negation_of_key_concept(sentence_doc, key_data_ops)

            # Determine best matching pattern and raw score
            best_pattern_idx = np.argmax(similarities[i])
            raw_score = float(similarities[i][best_pattern_idx])
            pattern = patterns[best_pattern_idx]

            adjusted_score = raw_score

            # If there's negation of key concept (e.g., "we do not collect"), reduce score drastically
            if negation:
                adjusted_score *= 0.3

            # Privacy-positive terms can lower risk slightly
            privacy_positive_count = count_privacy_positive_terms(context)
            if privacy_positive_count > 0:
                # The more privacy positive terms, the more we reduce risk.
                adjusted_score *= (1 - min(0.1 * privacy_positive_count, 0.3))

            # Context sentiment: if negative and we are talking about data sharing or collection, increase concern slightly
            if context_sentiment < -0.2:
                adjusted_score *= 1.1

            # Entity presence and sensitive keywords increase risk
            if entity_count > 0:
                adjusted_score *= (1 + min(entity_count * 0.05, 0.3))  # Up to 30% increase
            if sensitive_kw:
                adjusted_score *= 1.2  # Sensitive keywords significantly increase risk

            # Adjust based on sentiment of the sentence itself.
            # If the sentence is about data collection/sharing and is neutrally stated,
            # leave as is. If positive sentiment but describing data collection,
            # no direct effect. If negative sentiment and describing sharing ("we share your info" in a negative context),
            # might slightly boost risk.
            if sentiment < -0.1:
                adjusted_score *= 1.05

            # Only include relevant matches above a certain base threshold
            if adjusted_score > 0.5:
                matches.append({
                    'text': sentence,
                    'pattern': pattern,
                    'raw_similarity': raw_score,
                    'similarity_score': adjusted_score,
                    'context': context,
                    'sentiment': sentiment,
                    'entity_count': entity_count,
                    'sensitive_keywords': sensitive_kw
                })
        
        return matches
    
    except Exception as e:
        print(f"Error in find_similar_phrases: {str(e)}")
        return []

def comprehensive_phrase_matching(texts, base_patterns):
    """Find sentences that are semantically similar to base patterns and group by risk level."""
    try:
        # Get models
        nlp = get_nlp_model()
        bert_model = get_bert_model()
        
        # Process all texts
        all_matches = []
        for text in texts:
            matches = find_similar_phrases(text, base_patterns, bert_model, nlp)
            all_matches.extend(matches)
        
        # Group by risk level with updated thresholds
        grouped_results = {
            'high_risk': [],
            'medium_risk': [],
            'low_risk': []
        }
        
        # Adjust thresholds after additional weighting
        for match in all_matches:
            score = match['similarity_score']
            if score > 0.8:
                grouped_results['high_risk'].append(match)
            elif score > 0.65:
                grouped_results['medium_risk'].append(match)
            elif score > 0.5:
                grouped_results['low_risk'].append(match)
        
        return grouped_results
    
    except Exception as e:
        print(f"Error in comprehensive_phrase_matching: {str(e)}")
        return {'high_risk': [], 'medium_risk': [], 'low_risk': []}
