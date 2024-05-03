package com.advantage.advantage.repositories;

import com.advantage.advantage.models.MultipleAdAnalysisReport;
import com.advantage.advantage.models.MultipleImageAdAnalysisReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface MultipleImageAdAnalysisReportRepo extends JpaRepository<MultipleImageAdAnalysisReport, Long> {
    public List<MultipleImageAdAnalysisReport> findAll();
    public List<MultipleImageAdAnalysisReport> findByUploader_Id(long uploaderId);
    public List<MultipleImageAdAnalysisReport> findByTeam_TeamId(Long teamId);
    public List<MultipleImageAdAnalysisReport>  findByTitle(String title);
    public List<MultipleImageAdAnalysisReport> findByReportId(long reportId);
    public Long deleteByReportId(long reportId);
    public List<MultipleImageAdAnalysisReport> findByCreatedAt(Date createdAt);
    public List<MultipleImageAdAnalysisReport> findByComparison(String overview);
}
