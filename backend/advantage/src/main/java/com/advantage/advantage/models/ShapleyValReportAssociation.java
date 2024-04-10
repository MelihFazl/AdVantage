package com.advantage.advantage.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Entity
@Table(name = "shapley_val_association")
public  class ShapleyValReportAssociation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter private Long shapleyValId;

     @Getter @Setter long shapleyVal;
    @ManyToOne
    @JoinColumn(name = "report_id", referencedColumnName = "reportId")
    @Getter
    @Setter
    private SingleAdAnalysisReport report;
}
