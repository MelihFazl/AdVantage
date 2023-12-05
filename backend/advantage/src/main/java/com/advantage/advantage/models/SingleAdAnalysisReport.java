package com.advantage.advantage.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Entity
@Table(name="single_ad_analysis_report")
public class SingleAdAnalysisReport extends AnalysisReport{
    @Getter
    @Setter
    private String pros;
    @Getter
    @Setter
    private String cons;
    @Getter
    @Setter
    private String overview;
    @Getter
    @Setter
    private float successPrediction;

    @OneToOne(optional = false)
    @JoinColumn(name = "advertisement_id", referencedColumnName = "advertisementId")
    @Getter private TextualAdvertisement advertisement;

}
