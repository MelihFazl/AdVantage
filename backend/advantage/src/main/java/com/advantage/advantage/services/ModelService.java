package com.advantage.advantage.services;

import com.advantage.advantage.helpers.ImageModelAPIResponse;
import com.advantage.advantage.helpers.TextModelAPIResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ModelService {
    TextModelAPIResponse getTextualPrediction(String adText, float cost, String tone);

    float calculateCPI(TextModelAPIResponse responseObject);

    List<Float> calculateAgeDistribution(TextModelAPIResponse responseObject);

    List<Float> calculateGenderDistribution(TextModelAPIResponse responseObject);

    String calculateTextRecommendation(TextModelAPIResponse response);
    ImageModelAPIResponse getImagePrediction(MultipartFile multipartFile);

    float calculateImageCPI(ImageModelAPIResponse responseObject);

    List<Float> calculateImageAgeDistribution(ImageModelAPIResponse responseObject);

    List<Float> calculateImageGenderDistribution(ImageModelAPIResponse responseObject);
}
