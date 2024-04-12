package com.advantage.advantage.repositories;

import com.advantage.advantage.models.Advertisement;
import com.advantage.advantage.models.ImageAdAnalysisReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ImageAnalysisReportRepo extends JpaRepository<ImageAdAnalysisReport, Long> {
    public List<ImageAdAnalysisReport> findAll();

    public List<ImageAdAnalysisReport> findByTeam_TeamId(Long teamId);

    public List<ImageAdAnalysisReport> findByReportId(long reportId);

    public List<ImageAdAnalysisReport> findByUploaderId(long uploaderId);
    public List<ImageAdAnalysisReport>  findByTitle(String title);
    public List<ImageAdAnalysisReport> findByCreatedAt(Date createdAt);
    public List<ImageAdAnalysisReport> findByAdvertisement(Advertisement advertisement);
    public Long deleteByReportId(long reportId);
}
