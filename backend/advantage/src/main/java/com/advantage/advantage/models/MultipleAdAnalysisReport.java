package com.advantage.advantage.models;
import lombok.Data;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Entity
@Table(name="multiple_ad_analysis_report")
public class MultipleAdAnalysisReport extends AnalysisReport {

    @ElementCollection
    @CollectionTable(name = "pros", joinColumns = @JoinColumn(name = "reportId"))
    @Column(name = "pro")
    @Getter @Setter private List<String> pros;

    @ElementCollection
    @CollectionTable(name = "cons", joinColumns = @JoinColumn(name = "reportId"))
    @Column(name = "con")
    @Getter @Setter private List<String> cons;

    @ElementCollection
    @CollectionTable(name = "success_prediction", joinColumns = @JoinColumn(name = "reportId"))
    @Column(name = "prediction")
    @Getter @Setter private List<Float> successPrediction;

    @Getter @Setter private String comparison;

    @OneToMany
    @JoinColumn(name = "multiple_ads_analysis_report_id", referencedColumnName = "reportId")
    @Getter private List<TextualAdvertisement> advertisementList;


}
