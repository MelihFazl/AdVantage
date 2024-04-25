import numpy as np
import re
import joblib
from transformers import DistilBertTokenizer
from sklearn.preprocessing import StandardScaler
import torch

impression_scaler = joblib.load('./ml_models/impression_scaler.joblib')
cost_scaler = joblib.load('./ml_models/cost_scaler.joblib')

class TextAdPredictorBert:

    def __init__(self, text: str, spend: int, prediction_model, prediction_model_age, prediction_model_gender):
        self.text = text
        self.spend = np.array(spend)
        self.spend_transformed = None
        self.input_ids = None
        self.attention_mask = None
        self.prediction_model = prediction_model
        self.prediction_model_age = prediction_model_age
        self.prediction_model_gender = prediction_model_gender

    #For single text ad prediction
    def text_ad_predict(self):
        """
        Perform CPI prediction on the given text ad.

        Returns:
            Dictionary: Containts the CPI value and SHAP value.
        """
        self.text_ad_preprocess()
        return self.prediction()
    
    def text_ad_preprocess(self):
        """
        Preprocess the input text by tokenization, removal of stop words, and vectorization.
        """
        cleaned_text = np.array(clean_text(self.text))
        # Specify the model name
        model_name = "distilbert-base-uncased"

        # Load the tokenizer
        tokenizer = DistilBertTokenizer.from_pretrained(model_name)

        encoded_corpus = tokenizer(text=cleaned_text.tolist(),
                            add_special_tokens=True,
                            padding='max_length',
                            truncation='longest_first',
                            max_length=512,
                            return_attention_mask=True)

        self.input_ids = torch.tensor(encoded_corpus['input_ids'])
        self.attention_mask = torch.tensor(encoded_corpus['attention_mask'])
        self.spend_transformed = torch.tensor(cost_scaler.transform(np.log(self.spend).astype(np.float32).reshape(-1, 1)))

    def prediction(self):
        self.prediction_model.eval()
        self.prediction_model_age.eval()
        self.prediction_model_gender.eval()
        impression_prediction = self.prediction_model(self.input_ids, self.attention_mask, self.spend_transformed)
        age_distribution = self.prediction_model_age(self.input_ids, self.attention_mask)
        gender_distribution = self.prediction_model_gender(self.input_ids, self.attention_mask)
        analysis_values = dict()
        analysis_values["impression"] = np.exp(impression_scaler.inverse_transform(impression_prediction.detach().cpu().numpy())).squeeze()
        analysis_values["age_distribution"] = age_distribution.detach().cpu().numpy().tolist() 
        analysis_values["gender_distribution"] = gender_distribution.detach().cpu().numpy().tolist() 

        return analysis_values
    
def filter_ibans(text):
    pattern = r'fr\d{2}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{2}|fr\d{20}|fr[ ]\d{2}[ ]\d{3}[ ]\d{3}[ ]\d{3}[ ]\d{5}'
    text = re.sub(pattern, '', text)
    return text

def remove_space_between_numbers(text):
    text = re.sub(r'(\d)\s+(\d)', r'\1\2', text)
    return text

def filter_emails(text):
    pattern = r'(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})'
    text = re.sub(pattern, '', text)
    return text

def filter_ref(text):
    pattern = r'(\(*)(ref|réf)(\.|[ ])\d+(\)*)'
    text = re.sub(pattern, '', text)

    return text
def filter_websites(text):
    pattern = r'(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z][a-z\-]*'
    text = re.sub(pattern, '', text)
    return text

def filter_phone_numbers(text):
    pattern = r'(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})|(\d{2}[ ]\d{2}[ ]\d{3}[ ]\d{3})'
    text = re.sub(pattern, '', text)
    return text

def clean_text(text):
    text = text.lower()
    text = text.replace(u'\xa0', u' ')
    text = filter_phone_numbers(text)
    text = filter_emails(text)
    text = filter_ibans(text)
    text = filter_ref(text)
    text = filter_websites(text)
    text = remove_space_between_numbers(text)
    return text