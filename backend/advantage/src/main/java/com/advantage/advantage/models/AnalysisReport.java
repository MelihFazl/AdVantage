package com.advantage.advantage.models;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@MappedSuperclass
@Table(name="analysis_report")
public abstract class AnalysisReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter private Long reportId;

    @Getter @Setter private Date createdAt;

}
