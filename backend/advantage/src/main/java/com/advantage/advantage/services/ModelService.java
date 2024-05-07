package com.advantage.advantage.services;

import com.advantage.advantage.helpers.ImageModelAPIResponse;
import com.advantage.advantage.helpers.TextModelAPIResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface ModelService {
    TextModelAPIResponse getTextualPrediction(String adText, float cost, String tone);

    float calculateCPI(TextModelAPIResponse responseObject);

    List<Float> calculateAgeDistribution(TextModelAPIResponse responseObject);

    List<Float> calculateGenderDistribution(TextModelAPIResponse responseObject);

    String calculateTextRecommendation(TextModelAPIResponse response);
    ImageModelAPIResponse getImagePrediction(MultipartFile multipartFile);

    float calculateImageCPI(ImageModelAPIResponse responseObject);

    Map<Integer, Float> calculateImageAgeDistribution(ImageModelAPIResponse responseObject);

    Map<String, Float> calculateImageGenderDistribution(ImageModelAPIResponse responseObject);
}
