import os
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img
from tensorflow.image import resize
from io import BytesIO 
import tensorflow_addons as tfa

class ImageAdAgeGenderPredictor:
    def __init__(self, cpi_model_path, age_model_path, gender_model_path):
        # Load the custom model with custom objects
        self.cpi_model = load_model(cpi_model_path, custom_objects={'AdamW': tfa.optimizers.AdamW})
        self.age_model = load_model(age_model_path)
        self.gender_model = load_model(gender_model_path)
        print("Models loaded successfully.")

    def predict(self, image_data):
        """
        Perform prediction on the given image data.

        Args:
            image_data (bytes): Raw image data.

        Returns:
            Dictionary: Contains the CPI value, age distribution, and gender probabilities.
        """
        image_array = self.__prepare_data(image_data)

        cpi_prediction = self.cpi_model.predict(image_array)
        age_distribution = self.age_model.predict(image_array)
        gender_prediction = self.gender_model.predict(image_array)

        analysis_values = {
            "predicted_cpi": float(np.exp((cpi_prediction))),
            "age_distribution": {str(i): float(prob) for i, prob in enumerate(age_distribution[0])},
            "gender_probabilities": {
                "Male": float(gender_prediction[0][0]),
                "Female": float(gender_prediction[0][1])
            }
        }

        return analysis_values

    def __prepare_data(self, image_data):
        # Convert image data to array
        image = load_img(BytesIO(image_data), color_mode='rgb')
        image = resize(image, (224, 224))  # Resize the image to match model's input size
        image_array = img_to_array(image) / 255.0
        image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension
        return image_array

