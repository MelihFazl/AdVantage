package com.advantage.advantage.services;

import com.advantage.advantage.helpers.TextModelAPIResponse;

import java.util.List;

public interface ModelService {
    TextModelAPIResponse getTextualPrediction(String adText);

    float calculateCPI(String adText);

    List<Long> calculateShapVal(String adText);

}
