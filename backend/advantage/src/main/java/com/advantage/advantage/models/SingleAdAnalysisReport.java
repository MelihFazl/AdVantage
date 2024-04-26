package com.advantage.advantage.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name="single_ad_analysis_report")
public class SingleAdAnalysisReport extends AnalysisReport{
    @Getter
    @Setter
    private String tone;
    @Column(columnDefinition = "FLOAT DEFAULT 0")
    @Getter
    @Setter
    private float genderM;
    @Column(columnDefinition = "FLOAT DEFAULT 0")
    @Getter
    @Setter
    private float spend;
    @Column(columnDefinition = "FLOAT DEFAULT 0")
    @Getter
    @Setter
    private float genderF;

    @Column(columnDefinition = "FLOAT DEFAULT 0")
    @Getter
    @Setter
    private float age1317;
    @Column(columnDefinition = "FLOAT DEFAULT 0")

    @Getter
    @Setter
    private float age1824;
    @Column(columnDefinition = "FLOAT DEFAULT 0")

    @Getter
    @Setter
    private float age2534;
    @Column(columnDefinition = "FLOAT DEFAULT 0")

    @Getter
    @Setter
    private float age3544;
    @Column(columnDefinition = "FLOAT DEFAULT 0")

    @Getter
    @Setter
    private float age4554;
    @Column(columnDefinition = "FLOAT DEFAULT 0")
    @Getter
    @Setter
    private float age5564;
    @Column(columnDefinition = "FLOAT DEFAULT 0")
    @Getter
    @Setter
    private float age65;

    @Getter
    @Setter
    private String overview;
    @Column(columnDefinition = "FLOAT DEFAULT 0")
    @Getter
    @Setter
    private float successPrediction;


    @OneToOne(optional = false)
    @JoinColumn(name = "advertisement_id", referencedColumnName = "advertisementId")
    @Getter @Setter private TextualAdvertisement advertisement;

}
