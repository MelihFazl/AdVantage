package com.advantage.advantage.helpers;

import java.util.Map;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ImageModelAPIResponse {
    private float predicted_cpi;
    private Map<Integer, Float> age_distribution;
    private Map<String, Float> gender_probabilities;

    @JsonProperty("predicted_cpi")
    public float getCpi() {
        return predicted_cpi;
    }

    public void setCpi(float cpi) {
        this.predicted_cpi = cpi;
    }

    @JsonProperty("age_distribution")
    public Map<Integer, Float> getAgeDistribution() {
        return age_distribution;
    }

    public void setAgeDistribution(Map<Integer, Float> age_distribution) {
        this.age_distribution = age_distribution;
    }

    @JsonProperty("gender_probabilities")
    public Map<String, Float> getGenderProbabilities() {
        return gender_probabilities;
    }

    public void setGenderProbabilities(Map<String, Float> gender_probabilities) {
        this.gender_probabilities = gender_probabilities;
    }
}
