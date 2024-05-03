package com.advantage.advantage.models;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "multiple_image_ad_analysis_report")
public class MultipleImageAdAnalysisReport extends AnalysisReport {
    @Getter @Setter private String comparison;
}
