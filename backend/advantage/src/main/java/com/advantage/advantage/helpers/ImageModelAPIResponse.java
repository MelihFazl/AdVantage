package com.advantage.advantage.helpers;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ImageModelAPIResponse {
    private float cpi;

    private List<Float> age_distribution;
    private List<Float> gender_distribution;

    @JsonProperty("impression")
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

    public void setGender_distribution(List<Float> gender_distribution) {
        this.gender_distribution = gender_distribution;
    }

    @JsonProperty("gender_distribution")
    public List<Float> getGenderDistribution() {
        return gender_distribution;
    }

}
