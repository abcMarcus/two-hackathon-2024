import spacy

nlp = spacy.load("en_core_web_md")

def calculate_interest_compatibility(userdata1, userdata2):
    interests1 = userdata1['interests'].strip().split(", ")
    interests2 = userdata2['interests'].strip().split(", ")
    max_interest_compatibility = 0
    for interest in interests1:
        for interest2 in interests2:
            token1 = nlp(interest)
            token2 = nlp(interest2)
            max_interest_compatibility = max(max_interest_compatibility, token1.similarity(token2))
    return max_interest_compatibility

print(calculate_interest_compatibility({'interests': 'soccer, dogs'}, {'interests': 'music, art'}))
        
    
    
    