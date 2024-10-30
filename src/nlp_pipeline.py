from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import spacy
import numpy as np
from textblob import TextBlob

# Global model instances
_nlp = None
_bert_model = None

def get_nlp_model():
    """Load spaCy model for sentence splitting and NER"""
    global _nlp
    if _nlp is None:
        print("Loading spaCy model...")
        _nlp = spacy.load("en_core_web_sm")
    return _nlp

def get_bert_model():
    """Load BERT model for semantic similarity"""
    global _bert_model
    if _bert_model is None:
        print("Loading BERT model...")
        _bert_model = SentenceTransformer('all-MiniLM-L6-v2')
        _bert_model.show_progress_bar = False
    return _bert_model

def analyze_sentiment(text):
    """Analyze sentiment and subjectivity of text"""
    blob = TextBlob(text)
    return blob.sentiment.polarity, blob.sentiment.subjectivity

def get_complete_sentence(sent):
    """Get complete sentence including content after colons"""
    text = sent.text.strip()
    if text.endswith(':'):
        # Look ahead for the next sentence
        next_sent = list(sent.doc[sent.end:].sents)
        if next_sent:
            text += ' ' + next_sent[0].text.strip()
    return text

def find_similar_phrases(text, patterns, bert_model, nlp):
    """Calculate similarity between a text and multiple patterns with context awareness"""
    try:
        doc = nlp(text)
        sentences = []
        contexts = []
        
        # Get sentences with context
        for sent in doc.sents:
            clean_sent = get_complete_sentence(sent)
            if len(clean_sent) > 20 and len(clean_sent) < 500:
                # Get surrounding context
                start_idx = max(0, sent.start - 2)
                end_idx = min(len(doc), sent.end + 2)
                context = doc[start_idx:end_idx].text
                
                sentences.append(clean_sent)
                contexts.append(context)
        
        if not sentences:
            return []
        
        # Get embeddings
        sentence_embeddings = bert_model.encode(sentences, show_progress_bar=False)
        pattern_embeddings = bert_model.encode(patterns, show_progress_bar=False)
        
        # Calculate similarities
        similarities = cosine_similarity(sentence_embeddings, pattern_embeddings)
        
        matches = []
        for i, (sentence, context) in enumerate(zip(sentences, contexts)):
            # Analyze sentiment and context
            sentiment, subjectivity = analyze_sentiment(sentence)
            context_sentiment, _ = analyze_sentiment(context)
            
            # Check for negations and privacy-positive statements
            has_negation = any(neg in sentence.lower() for neg in [
                'not', 'never', 'no', "don't", "doesn't", "won't", 
                "wouldn't", "cannot", "can't", "none", "neither"
            ])
            
            is_privacy_positive = any(term in context.lower() for term in [
                'privacy', 'protect', 'secure', 'confidential', 
                'transparency', 'rights', 'consent'
            ])
            
            # Get best matching pattern
            best_pattern_idx = np.argmax(similarities[i])
            score = float(similarities[i][best_pattern_idx])
            pattern = patterns[best_pattern_idx]
            
            # Adjust score based on context
            if has_negation:
                score *= 0.5
            if is_privacy_positive and sentiment > 0:
                score *= 0.7
            if context_sentiment < 0:
                score *= 1.2
                
            # Only include relevant matches
            if score > 0.45:
                matches.append({
                    'text': sentence,
                    'pattern': pattern,
                    'similarity_score': score,
                    'context': context,
                    'sentiment': sentiment
                })
        
        return matches
    
    except Exception as e:
        print(f"Error in find_similar_phrases: {str(e)}")
        return []

def comprehensive_phrase_matching(texts, base_patterns):
    """Find sentences that are semantically similar to base patterns"""
    
    try:
        # Get models
        nlp = get_nlp_model()
        bert_model = get_bert_model()
        
        # Process all texts
        all_matches = []
        for text in texts:
            matches = find_similar_phrases(text, base_patterns, bert_model, nlp)
            all_matches.extend(matches)
        
        # Group by risk level
        grouped_results = {
            'high_risk': [],
            'medium_risk': [],
            'low_risk': []
        }
        
        # Sort matches into risk levels
        for match in all_matches:
            score = match['similarity_score']
            if score > 0.7:
                grouped_results['high_risk'].append(match)
            elif score > 0.55:
                grouped_results['medium_risk'].append(match)
            elif score > 0.45:
                grouped_results['low_risk'].append(match)
        
        return grouped_results
    
    except Exception as e:
        print(f"Error in comprehensive_phrase_matching: {str(e)}")
        return {'high_risk': [], 'medium_risk': [], 'low_risk': []}
