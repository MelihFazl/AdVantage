package com.advantage.advantage.services;

import com.advantage.advantage.helpers.TextModelAPIResponse;

import java.util.List;

public interface ModelService {
    TextModelAPIResponse getTextualPrediction(String adText, float cost, String tone);

    float calculateCPI(TextModelAPIResponse responseObject);

    List<Float> calculateAgeDistribution(TextModelAPIResponse responseObject);

    List<Float> calculateGenderDistribution(TextModelAPIResponse responseObject);


}
