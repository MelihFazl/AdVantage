from nltk.corpus import stopwords
import nltk
from nltk.tokenize import word_tokenize
import numpy as np
from gensim.models import Word2Vec
nltk.download('stopwords')
nltk.download('punkt')

class TextAdPredictor:

    def __init__(self, text: str, model):

        self.doc_vector = None
        self.text = text
        self.model = model
        self.stop_words = set(stopwords.words('english'))

    def text_ad_preprocess(self):
        """
        Preprocess the input text by tokenization, removal of stop words, and vectorization.
        """
        tokens = self.tokenize_and_remove_stopwords(self.text, word_tokenize, self.stop_words)
        self.doc_vector = self.generate_doc_vector(tokens, Word2Vec.load("./ml_models/word2vec_model.model"), 100)

    #For single text ad prediction
    def text_ad_predict(self):
        """
        Perform CPI prediction on the given text ad.

        Returns:
            Tuple: A tuple containing JSON-formatted detection results and the base64 encoded image.
        """
        self.text_ad_preprocess()
        CPI_prediction = self.model.predict(self.doc_vector)
        return CPI_prediction
    
    def tokenize_and_remove_stopwords(self, text, word_tokenize, stop_words):
        tokens = word_tokenize(text)
        tokens = [word.lower() for word in tokens if word.isalpha() and word.lower() not in stop_words]
        return np.array(tokens)

    def average_word_vectors(self, words, model, vocabulary, num_features):
        feature_vector = np.zeros((num_features,), dtype="float64")
        nwords = 0.

        for word in words:
            if word in vocabulary:
                nwords = nwords + 1.
                feature_vector = np.add(feature_vector, model.wv[word])

        if nwords:
            feature_vector = np.divide(feature_vector, nwords)

        return feature_vector
    
    def generate_doc_vector(self, doc, model, num_features):
        doc_vector = [self.average_word_vectors(doc, model, model.wv.index_to_key, num_features)]
        return np.array(doc_vector)