package com.advantage.advantage.helpers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TextModelAPIResponse {
    private float cpi;

    private List<Long> shapVal;

    @JsonProperty("cpi")
    public float getCpi() {
        return cpi;
    }

    @JsonProperty("shap_values")
    public List<Long> getShapleyVal(){return shapVal; }

    public void setCpi(float cpi) {
        this.cpi = cpi;
    }

    public void setShapVal(List<Long> shapVal) {
        this.shapVal = shapVal;
    }

}
