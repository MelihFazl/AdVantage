package com.advantage.advantage.models;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "advertisement_report_association")
public class AdvertisementReportAssociation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter  Long id;

    @ManyToOne
    @JoinColumn(name = "advertisement_id")
    @Getter @Setter TextualAdvertisement advertisement;

    @ManyToOne
    @JoinColumn(name = "report_id")
    @Getter @Setter MultipleAdAnalysisReport report;

    @Getter @Setter private  String pros;
    @Getter @Setter private String cons;

    @Getter @Setter private float prediction;

}
