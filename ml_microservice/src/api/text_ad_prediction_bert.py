import os
import logging
import ssl
from fastapi import FastAPI, File, UploadFile, Request
from fastapi.responses import JSONResponse
from src.service.image_ad_age_gender_predictor import ImageAdAgeGenderPredictor
from src.service.text_ad_predictor_bert import TextAdPredictorBert
import torch
import requests
import json
from transformers import DistilBertModel
import torch.nn as nn

ssl._create_default_https_context = ssl._create_unverified_context

if not os.path.exists('logs'):
    os.mkdir('logs')

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

file_handler = logging.FileHandler('logs/api.log')
file_handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s : %(levelname)s : %(name)s : %(message)s')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

app = FastAPI()

# Model paths
cpi_model_path = './ml_models/image_cpi_model.h5'
age_model_path = './ml_models/image_age_model.h5'
gender_model_path = './ml_models/image_gender_model.h5'
bert_regression_model_path = './ml_models/bert_regression.pth'
bert_age_classification_model_path = './ml_models/bert_age_classification.pth'
bert_gender_classification_model_path = './ml_models/bert_gender_classification.pth'

# Load BERT models
class DistilBertRegressor(nn.Module):

    def __init__(self, drop_rate=0.2, freeze_bert=False):

        super(DistilBertRegressor, self).__init__()
        D_in, D_out = 768 + 1, 1

        self.distilbert = \
                   DistilBertModel.from_pretrained("distilbert-base-uncased")
        self.regressor = nn.Sequential(
            nn.Dropout(drop_rate),
            nn.BatchNorm1d(D_in),
            nn.Linear(D_in, D_out)
        )

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
            nn.Linear(D_in, 256),
            nn.BatchNorm1d(256),  # Add BatchNorm layer
            nn.ReLU(),
            nn.Linear(256, D_out),
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
            nn.Linear(D_in, 256),
            nn.BatchNorm1d(256),  # Add BatchNorm layer
            nn.ReLU(),
            nn.Linear(256, D_out),
            nn.Softmax(dim=1)  # Ensure outputs are probabilities that sum to 1
        )

    def forward(self, input_ids, attention_masks):
        outputs = self.distilbert(input_ids=input_ids, attention_mask=attention_masks)
        hidden_state = outputs[0]  # (batch_size, seq_length, hidden_size)
        pooled_output = hidden_state[:, 0]  # Use the first token's embeddings (CLS token)

        # Pass pooled_output through regressor to get final output
        logits = self.regressor(pooled_output)
        return logits
    
# Load BERT models
prediction_model = DistilBertRegressor()
prediction_model_age = DistilBertClassifierAge()
prediction_model_gender = DistilBertClassifierGender()

prediction_model.load_state_dict(torch.load(bert_regression_model_path, map_location=torch.device('cpu')))
prediction_model_age.load_state_dict(torch.load(bert_age_classification_model_path, map_location=torch.device('cpu')))
prediction_model_gender.load_state_dict(torch.load(bert_gender_classification_model_path, map_location=torch.device('cpu')))

prediction_model.to(torch.float)
prediction_model_age.to(torch.float)
prediction_model_gender.to(torch.float)

# API key
api_key_path = './src/api/DO_NOT_COMMIT_ENV.txt'
API_KEY = None

def get_api_key_from_file(file_path):
    try:
        with open(file_path, 'r') as file:
            return file.readline().strip()
    except FileNotFoundError:
        logger.error("Error: The file was not found.")
        return None
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        return None

API_KEY = get_api_key_from_file(api_key_path)
url = f"https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key={API_KEY}"

headers = {
    'Content-Type': 'application/json'
}

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
                                "text": f"Give me 1 paragraph with {tone} tone of the following ad text to improve its impressions. Do not change context and only keep the paragraphs in your response: {text_ad}"
                            }
                        ]
                    }
                ]
            }

            response = requests.post(url, json=data, headers=headers)

            # Parse the JSON string into a Python dictionary
            response_data = json.loads(response.text)
            print(response.text)
            # Navigate through the dictionary to extract the desired text
            if 'candidates' in response_data and response_data['candidates'] and 'content' in response_data['candidates'][0] and 'parts' in response_data['candidates'][0]['content']:
                paragraphs_text = response_data['candidates'][0]['content']['parts'][0].get('text', "No text available.")
                # Split the text by explicitly specifying the paragraph labels
                parts = paragraphs_text.split("**Paragraph 1:**")
                parts = parts[1].strip()

                paragraphs_text = parts
            else:
                paragraphs_text = "This content may be harmful. Check our policies for further information."

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

@app.post("/image_ad/predict")
async def image_detect(file: UploadFile = File(...)):
    """
    API endpoint for performing image ad prediction on an uploaded image file.

    Args:
        file (UploadFile): Uploaded image file.
    Returns:
        JSONResponse: JSON response containing analysis result.
    """
    try:
        # Read the file contents
        image_data = await file.read()

        predictor = ImageAdAgeGenderPredictor(cpi_model_path, age_model_path, gender_model_path)
        # Perform image prediction
        prediction_result = predictor.predict(image_data)
        logger.info("Prediction results: %s", prediction_result)
        return JSONResponse(prediction_result, status_code=200)
    except Exception as error:
        logger.error("Image ad analysis failed: %s", error)
        return JSONResponse({"message": "image ad analysis failed",
                             "errors": str(error)},
                            status_code=400)


async def predict_text_ad(data: dict):
    """
    Perform prediction on a textual advertisement.

    Args:
        data (dict): Request data containing "text_ad", "spend", and "tone".
    Returns:
        JSONResponse: JSON response containing analysis result.
    """
    try:
        text_ad = data.get('text_ad')
        spend = data.get('spend')
        tone = data.get('tone')

        # Call Gemini API
        gemini_data = {
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
        gemini_response = requests.post(url, json=gemini_data, headers=headers)
        gemini_response_data = json.loads(gemini_response.text)
        paragraphs_text = gemini_response_data.get('candidates')[0]['content']['parts'][0]['text']

        # Perform prediction
        predictor = TextAdPredictorBert(text_ad, spend, prediction_model, prediction_model_age, prediction_model_gender)
        prediction_result = predictor.text_ad_predict()

        return JSONResponse({"impression": float(prediction_result["impression"]),
                             "age_distribution": prediction_result["age_distribution"][0],
                             "gender_distribution": prediction_result["gender_distribution"][0],
                             "text_recommendation": paragraphs_text,
                             "message": "Prediction successful.",
                             "error": None},
                            status_code=200)
    except Exception as error:
        logger.error(f"Text ad prediction failed: {error}")
        return JSONResponse({"message": "Text ad prediction failed.", "error": str(error)}, status_code=500)

async def predict_image_ad(data: dict):
    """
    Perform prediction on an image advertisement.

    Args:
        data (dict): Request data containing "image_file".
    Returns:
        JSONResponse: JSON response containing analysis result.
    """
    try:
        image_data = data.get('image_file').file.read()

        predictor = ImageAdAgeGenderPredictor(cpi_model_path, age_model_path, gender_model_path)
        prediction_result = predictor.predict(image_data)

        return JSONResponse(prediction_result, status_code=200)
    except Exception as error:
        logger.error(f"Image ad prediction failed: {error}")
        return JSONResponse({"message": "Image ad prediction failed.", "error": str(error)}, status_code=500)
