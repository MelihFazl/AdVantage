package com.advantage.advantage.services;

import com.advantage.advantage.models.ImageAdvertisement;
import com.advantage.advantage.models.ImageAdvertisementReportAssociation;
import com.advantage.advantage.models.MultipleAdAnalysisReport;
import com.advantage.advantage.models.MultipleImageAdAnalysisReport;
import com.advantage.advantage.repositories.MultipleImageAdAnalysisReportRepo;

import java.util.Date;
import java.util.List;

public interface MultipleImageAdAnalysisReportService {
    public List<MultipleImageAdAnalysisReport> getAllReports();
    public List<MultipleImageAdAnalysisReport>getByReportId(long reportId);
    public List<MultipleImageAdAnalysisReport> getByUploaderId(long uploaderId);
    public List<MultipleImageAdAnalysisReport> getByCreatedAt(Date createdAt);
    public List<MultipleImageAdAnalysisReport> getByTitle(String title);
    public List<MultipleImageAdAnalysisReport>getByTeamId(long teamId);
    public MultipleImageAdAnalysisReport saveAdAnalysisReport(String title, Date createdAt, long uploaderId, String comparison, Long teamId);
    public MultipleImageAdAnalysisReport updateAnalysisReport(MultipleImageAdAnalysisReport editedAnalysisReport, long oldAnalysisReportId);
    public boolean deleteReportByReportId(long reportId);
}
