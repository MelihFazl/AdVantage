package com.advantage.advantage.repositories;

import com.advantage.advantage.models.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface MultipleAnalysisReportRepo  extends JpaRepository<MultipleAdAnalysisReport, Long> {
    public List<MultipleAdAnalysisReport> findAll();
    public List<MultipleAdAnalysisReport> findByUploaderId(long uploaderId);

    public List<MultipleAdAnalysisReport> findByUploader_Team_TeamId(Long teamId);

    public List<MultipleAdAnalysisReport>  findByTitle(String title);
    public List<MultipleAdAnalysisReport> findByReportId(long reportId);
    public MultipleAdAnalysisReport deleteByReportId(long reportId);
    public List<MultipleAdAnalysisReport> findByCreatedAt(Date createdAt);
    public List<MultipleAdAnalysisReport> findByComparison(String overview);

}
