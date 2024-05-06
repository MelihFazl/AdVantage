import os
import logging
import ssl
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from src.service.image_ad_age_gender_predictor import ImageAdAgeGenderPredictor

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
