import os
import logging
from warnings import filterwarnings, simplefilter
import ssl
import joblib
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from src.service.text_ad_predictor import TextAdPredictor
import sklearn.ensemble

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
model = joblib.load('./ml_models/gradient_boosting_model.pkl')

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
            logger.info("allah1")

            data = await request.json()
            text_ad = data.get('text_ad')


            logger.info("allah2")

            if text_ad is None:
                return JSONResponse({"message": "text_ad is required in the request body",
                                     "errors": "error"}, 
                                    status_code=400,
                                    )
            logger.info("allah")

            predictor = TextAdPredictor(text_ad, model)
            # Perform text prediction
            prediction_result = predictor.text_ad_predict()
            logger.info("Detection results: %s", prediction_result)
            return JSONResponse({"cpi": prediction_result[0],
                                "message": "object detected successfully",
                                "errors": None},
                                status_code=200)
        
        except Exception as error:
            logger.error(["process failed", error])
            return JSONResponse({"message": "textual ad analysis failed",
                                "errors": "error"},
                                status_code=400)
