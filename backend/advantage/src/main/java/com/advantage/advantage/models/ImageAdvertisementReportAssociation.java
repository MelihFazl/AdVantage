package com.advantage.advantage.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "image_advertisement_report_association")
public class ImageAdvertisementReportAssociation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    Long id;

    @ManyToOne
    @JoinColumn(name = "advertisement_id")
    @Getter @Setter
    ImageAdvertisement advertisement;

    @ManyToOne
    @JoinColumn(name = "report_id")
    @Getter @Setter MultipleImageAdAnalysisReport report;

    @Getter @Setter private float prediction;
}
