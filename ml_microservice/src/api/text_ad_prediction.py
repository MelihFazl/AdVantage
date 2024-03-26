import os
import logging
import shap
from warnings import filterwarnings, simplefilter
import ssl
import joblib
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from src.service.text_ad_predictor import TextAdPredictor
import nltk
from gensim.models import Word2Vec
nltk.download('stopwords')
nltk.download('punkt')

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
prediction_model = joblib.load('./ml_models/gradient_boosting_model.pkl')
tfidf_vectorizer = joblib.load('./ml_models/tfidf_vectorizer.joblib')
gb_regressor_suggestion = joblib.load('./ml_models/gb_regressor_suggestion.joblib')
shap_tree_explainer = shap.TreeExplainer(gb_regressor_suggestion)
word2vec_model = Word2Vec.load('./ml_models/word2vec_model.model')

@app.post("/text_ad/predict")
async def image_detect(request: Request):
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

            if text_ad is None:
                return JSONResponse({"message": "text_ad is required in the request body",
                                     "errors": "error"}, 
                                    status_code=400,
                                    )
            predictor = TextAdPredictor(text_ad, prediction_model, shap_tree_explainer, tfidf_vectorizer, word2vec_model)
            # Perform text prediction
            prediction_result = predictor.text_ad_predict()
            logger.info("Detection results: %s", prediction_result)
            return JSONResponse({"cpi": prediction_result["CPI_prediction"][0],
                                 "shap_values": prediction_result["shap_values"],
                                "message": "object detected successfully",
                                "errors": None},
                                status_code=200)
        
        except Exception as error:
            logger.error(["process failed", error])
            return JSONResponse({"message": "textual ad analysis failed",
                                "errors": "error"},
                                status_code=400)
