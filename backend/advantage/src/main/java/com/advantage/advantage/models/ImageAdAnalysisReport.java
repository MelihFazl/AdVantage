package com.advantage.advantage.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="image_ad_analysis_report")
public class ImageAdAnalysisReport extends  AnalysisReport{
    @OneToOne(optional = false)
    @JoinColumn(name = "advertisement_id", referencedColumnName = "advertisementId")
    @Getter
    @Setter
    private ImageAdvertisement advertisement;

    @Getter @Setter float prediction;
}
