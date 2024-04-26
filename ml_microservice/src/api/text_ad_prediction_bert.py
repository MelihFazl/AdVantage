import os
import logging
from warnings import filterwarnings, simplefilter
import ssl
import joblib
import torch
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from src.service.text_ad_predictor_bert import TextAdPredictorBert
import requests
import torch.nn as nn
from transformers import DistilBertModel
import json

def get_api_key_from_file(file_path):
    try:
        with open(file_path, 'r') as file:
            return file.readline().strip()
    except FileNotFoundError:
        print("Error: The file was not found.")
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None
    
# Specify the path to your file containing the API key
api_key_path = './src/api/DO_NOT_COMMIT_ENV.txt'
API_KEY = get_api_key_from_file(api_key_path)
url = f"https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key={API_KEY}"

headers = {
    'Content-Type': 'application/json'
}

class DistilBertRegressor(nn.Module):

    def __init__(self, drop_rate=0.2, freeze_bert=False):

        super(DistilBertRegressor, self).__init__()
        D_in, D_out = 768 + 1, 1

        self.distilbert = \
                   DistilBertModel.from_pretrained("distilbert-base-uncased")
        self.regressor = nn.Sequential(
            nn.Dropout(drop_rate),
              nn.Linear(D_in, D_out))

    def forward(self, input_ids, attention_masks, spends):
        outputs = self.distilbert(input_ids=input_ids, attention_mask=attention_masks)
        hidden_state = outputs[0]  # (batch_size, seq_length, hidden_size)
        pooled_output = hidden_state[:, 0]  # Use the first token's embeddings
        # Concatenate pooled_output with spends
        combined_input = torch.cat((pooled_output, spends), dim=1)
        outputs = self.regressor(combined_input)
        return outputs

class DistilBertClassifierAge(nn.Module):

    def __init__(self, drop_rate=0.2):
        super(DistilBertClassifierAge, self).__init__()
        # Input dimension for each token embedding from BERT
        D_in, D_out = 768, 7  # Output dimension matches the number of age categories

        self.distilbert = DistilBertModel.from_pretrained("distilbert-base-uncased")
        # Define the regressor with a Dropout and a Linear layer
        self.regressor = nn.Sequential(
            nn.Dropout(drop_rate),
            nn.Linear(D_in, D_out),
            nn.Softmax(dim=1)  # Ensure outputs are probabilities that sum to 1
        )

    def forward(self, input_ids, attention_masks):
        outputs = self.distilbert(input_ids=input_ids, attention_mask=attention_masks)
        hidden_state = outputs[0]  # (batch_size, seq_length, hidden_size)
        pooled_output = hidden_state[:, 0]  # Use the first token's embeddings (CLS token)

        # Pass pooled_output through regressor to get final output
        logits = self.regressor(pooled_output)
        return logits
    
class DistilBertClassifierGender(nn.Module):

    def __init__(self, drop_rate=0.2):
        super(DistilBertClassifierGender, self).__init__()
        # Input dimension for each token embedding from BERT
        D_in, D_out = 768, 2  # Output dimension matches the number of age categories

        self.distilbert = DistilBertModel.from_pretrained("distilbert-base-uncased")
        # Define the regressor with a Dropout and a Linear layer
        self.regressor = nn.Sequential(
            nn.Dropout(drop_rate),
            nn.Linear(D_in, D_out),
            nn.Softmax(dim=1)  # Ensure outputs are probabilities that sum to 1
        )

    def forward(self, input_ids, attention_masks):
        outputs = self.distilbert(input_ids=input_ids, attention_mask=attention_masks)
        hidden_state = outputs[0]  # (batch_size, seq_length, hidden_size)
        pooled_output = hidden_state[:, 0]  # Use the first token's embeddings (CLS token)

        # Pass pooled_output through regressor to get final output
        logits = self.regressor(pooled_output)
        return logits

    
filterwarnings("ignore")
simplefilter(action='ignore', category=FutureWarning)

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

if not os.path.exists('logs'):
    os.mkdir('logs')

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
logging.StreamHandler()
file_handler = logging.FileHandler('logs/api.log')
file_handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s : %(levelname)s : %(name)s : %(message)s')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

app = FastAPI()
prediction_model = DistilBertRegressor()
prediction_model_age = DistilBertClassifierAge()
prediction_model_gender = DistilBertClassifierGender()

prediction_model.load_state_dict(torch.load('./ml_models/bert_regression.pth', map_location=torch.device('cpu')))
prediction_model.to(torch.float)

prediction_model_age.load_state_dict(torch.load('./ml_models/bert_age_classification.pth', map_location=torch.device('cpu')))
prediction_model_age.to(torch.float)

prediction_model_gender.load_state_dict(torch.load('./ml_models/bert_gender_classification.pth', map_location=torch.device('cpu')))
prediction_model_gender.to(torch.float)
#gb_regressor_suggestion = joblib.load('./ml_models/gb_regressor_suggestion.joblib')

@app.post("/text_ad/predict")
async def text_prediction(request: Request):
    """
    API endpoint for performing textual prediction on an uploaded text ad.

    Args:
        request (Request): HTTP request object containing JSON payload with "text_ad".
    Returns:
        JSONResponse: JSON response containing analysis result.
    """
    if request.method == "POST":
        try:
            # Get JSON payload from request body
            data = await request.json()
            text_ad = data.get('text_ad')
            spend = data.get('spend')
            tone = data.get('tone')

            data = {
                "contents": [
                    {
                        "role": "user",
                        "parts": [
                            {
                                "text": f"Give me 2 different paragraphs with {tone} tone of the following ad text to improve its impressions. Do not change context and only keep the paragraphs in your response: {text_ad}"
                            }
                        ]
                    }
                ]
            }

            response = requests.post(url, json=data, headers=headers)

            # Parse the JSON string into a Python dictionary
            response_data = json.loads(response.text)

            # Navigate through the dictionary to extract the desired text
            if 'candidates' in response_data and response_data['candidates'] and 'content' in response_data['candidates'][0] and 'parts' in response_data['candidates'][0]['content']:
                paragraphs_text = response_data['candidates'][0]['content']['parts'][0].get('text', "No text available.")
            else:
                paragraphs_text = "Gemini API does not work currently."

            if (text_ad or spend or tone) is None:
                return JSONResponse({"message": "text_ad, tone and spend is required in the request body",
                                     "errors": "error"}, 
                                    status_code=400,
                                    )
            predictor = TextAdPredictorBert(text_ad, spend, prediction_model, prediction_model_age, prediction_model_gender)
            # Perform text prediction
            prediction_result = predictor.text_ad_predict()
            logger.info("Detection results: %s", prediction_result)
            return JSONResponse({"impression": float(prediction_result["impression"]),
                                 "age_distribution": prediction_result["age_distribution"][0],
                                 "gender_distribution": prediction_result["gender_distribution"][0],
                                 "text_recommendation": paragraphs_text,
                                "message": "object detected successfully",
                                "errors": None},
                                status_code=200)
        
        except Exception as error:
            logger.error(["process failed", error])
            return JSONResponse({"message": "textual ad analysis failed",
                                "errors": "error"},
                                status_code=400)
