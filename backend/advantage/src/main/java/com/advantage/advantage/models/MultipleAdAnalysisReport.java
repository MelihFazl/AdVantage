package com.advantage.advantage.models;
import lombok.Data;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Entity
@Table(name="multiple_ad_analysis_report")
public class MultipleAdAnalysisReport extends AnalysisReport {

    @Getter @Setter private String comparison;




}
