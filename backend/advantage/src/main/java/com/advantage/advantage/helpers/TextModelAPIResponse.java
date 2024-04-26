package com.advantage.advantage.helpers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TextModelAPIResponse {
    private float cpi;

    private List<Float> age_distribution;
    private List<Float> gender_distribution;


    @JsonProperty("cpi")
    public float getCpi() {
        return cpi;
    }

    public void setCpi(float cpi) {
        this.cpi = cpi;
    }
    @JsonProperty("age_distribution")
    public List<Float> getAgeDistribution() {
        return age_distribution;
    }
    public void setAge_distribution(List<Float> age_distribution) {
        this.age_distribution = age_distribution;
    }

    public void setGender_distribution(List<Float> age_distribution) {
        this.age_distribution = age_distribution;
    }

    @JsonProperty("gender_distribution")
    public List<Float> getGenderDistribution() {
        return gender_distribution;
    }

}
