from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import numpy as np
#from sklearn.feature_extraction.text import TfidfVectorizer

class TextAdPredictor:

    def __init__(self, text: str, prediction_model, shap_tree_explainer, tfidf_vectorizer, word2vec_model):
        self.doc_vector = None
        self.text = text
        self.prediction_model = prediction_model
        self.tfidf_vectorizer = tfidf_vectorizer
        self.shap_tree_explainer = shap_tree_explainer
        self.word2vec_model = word2vec_model
        self.stop_words = set(stopwords.words('english'))

    #For single text ad prediction
    def text_ad_predict(self):
        """
        Perform CPI prediction on the given text ad.

        Returns:
            Dictionary: Containts the CPI value and SHAP value.
        """
        self.text_ad_preprocess()
        CPI_prediction = self.prediction_model.predict(self.doc_vector)
        shap_values = self.apply_shap_analysis_keyword()
        analysis_values = dict()
        analysis_values["CPI_prediction"] = CPI_prediction
        analysis_values["shap_values"] = shap_values
        return analysis_values
    
    def text_ad_preprocess(self):
        """
        Preprocess the input text by tokenization, removal of stop words, and vectorization.
        """
        tokens = self.tokenize_and_remove_stopwords(self.text, word_tokenize, self.stop_words)
        self.doc_vector = self.generate_doc_vector(tokens, self.word2vec_model, 100)
    
    def tokenize_and_remove_stopwords(self, text, word_tokenize, stop_words):
        tokens = word_tokenize(text)
        tokens = [word.lower() for word in tokens if word.isalpha() and word.lower() not in stop_words]
        return np.array(tokens)
    
    def generate_doc_vector(self, doc, model, num_features):
        doc_vector = [self.average_word_vectors(doc, model, model.wv.index_to_key, num_features)]
        return np.array(doc_vector)

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
    
    def apply_shap_analysis_keyword(self):
        feature_names = self.tfidf_vectorizer.get_feature_names_out()
        tfidf_vectorized_text = self.tfidf_vectorizer.transform([self.text]).toarray()
        shap_analysis = self.shap_tree_explainer.shap_values(tfidf_vectorized_text)
        #shap_values = shap_analysis[0] if isinstance(shap_analysis, list) else shap_analysis
        shap_values = shap_analysis[0]
        shap_name_mapping = dict(zip(feature_names.tolist(),shap_values.tolist()))
        tuples = list()
  
        for key, value in shap_name_mapping.items():
            try:
                tuples.append((key, float(value)))
            except Exception as e:
                print(f"Error occurred: {e}")


        sorted_tuples = sorted(tuples, key=lambda x: x[1])

        # Get the three items with the lowest values and the three with the highest values
        print(type(sorted_tuples))
        print(sorted_tuples)

        lowest_three = sorted_tuples[:3]      
        highest_three = sorted_tuples[-3:]

        print(lowest_three)
        print(highest_three)
        # Combine the lists
        selected_six = lowest_three + highest_three

        # Convert back to dictionary if needed
        selected_dict = dict(selected_six)       
        return selected_dict
