package com.advantage.advantage.helpers;

public class ImageModelDTO {

    private float prediction;
    private float genderM;
    private float genderF;
    private float age1317;
    private float age1824;
    private float age2534;
    private float age3544;
    private float age4554;
    private float age5564;
    private float age65;

    public ImageModelDTO(float prediction, float genderM, float genderF, float age1317, float age1824, float age2534, float age3544, float age4554, float age5564, float age65) {
        this.prediction = prediction;
        this.genderM = genderM;
        this.genderF = genderF;
        this.age1317 = age1317;
        this.age1824 = age1824;
        this.age2534 = age2534;
        this.age3544 = age3544;
        this.age4554 = age4554;
        this.age5564 = age5564;
        this.age65 = age65;
    }

    public float getPrediction() {
        return prediction;
    }

    public void setPrediction(float prediction) {
        this.prediction = prediction;
    }

    public float getGenderM() {
        return genderM;
    }

    public void setGenderM(float genderM) {
        this.genderM = genderM;
    }

    public float getGenderF() {
        return genderF;
    }

    public void setGenderF(float genderF) {
        this.genderF = genderF;
    }

    public float getAge1317() {
        return age1317;
    }

    public void setAge1317(float age1317) {
        this.age1317 = age1317;
    }

    public float getAge1824() {
        return age1824;
    }

    public void setAge1824(float age1824) {
        this.age1824 = age1824;
    }

    public float getAge2534() {
        return age2534;
    }

    public void setAge2534(float age2534) {
        this.age2534 = age2534;
    }

    public float getAge3544() {
        return age3544;
    }

    public void setAge3544(float age3544) {
        this.age3544 = age3544;
    }

    public float getAge4554() {
        return age4554;
    }

    public void setAge4554(float age4554) {
        this.age4554 = age4554;
    }

    public float getAge5564() {
        return age5564;
    }

    public void setAge5564(float age5564) {
        this.age5564 = age5564;
    }

    public float getAge65() {
        return age65;
    }

    public void setAge65(float age65) {
        this.age65 = age65;
    }
}
