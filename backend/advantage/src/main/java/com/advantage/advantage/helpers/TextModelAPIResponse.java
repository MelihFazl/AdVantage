package com.advantage.advantage.helpers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TextModelAPIResponse {
    private float cpi;

    private List<Float> age_distribution;
    private List<Float> gender_distribution;
    private String text_recommendation;

    @JsonProperty("impression")
    public float getCpi() {
        return cpi;
    }

    public void setCpi(float cpi) {
        this.cpi = cpi;
    }

    @JsonProperty("text_recommendation")
    public String getTextRecommendation() {
        return text_recommendation;
    }

    public void setText_recommendation(String recommendation) {
        this.text_recommendation = recommendation;
    }

    @JsonProperty("age_distribution")
    public List<Float> getAgeDistribution() {
        return age_distribution;
    }
    public void setAge_distribution(List<Float> age_distribution) {
        this.age_distribution = age_distribution;
    }

    public void setGender_distribution(List<Float> gender_distribution) {
        this.gender_distribution = gender_distribution;
    }

    @JsonProperty("gender_distribution")
    public List<Float> getGenderDistribution() {
        return gender_distribution;
    }

}
