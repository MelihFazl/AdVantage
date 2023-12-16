package com.advantage.advantage.services;

import com.advantage.advantage.models.*;

import java.util.Date;
import java.util.List;

public interface MultipleAdAnalysisReportService {
    public List<MultipleAdAnalysisReport> getAllReports();
    public List<MultipleAdAnalysisReport> getByReportId(long reportId);
    public List<MultipleAdAnalysisReport> getByUploader(TeamMember uploader);
    public List<MultipleAdAnalysisReport> getByCreatedAt(Date createdAt);
    public List<MultipleAdAnalysisReport> getByTitle(String title);
    public String saveAdAnalysisReport(String title, Date createdAt, TeamMember uploader, String comparison);
    public MultipleAdAnalysisReport updateAnalysisReport(MultipleAdAnalysisReport editedAnalysisReport, long oldAnalysisReportId);
    public MultipleAdAnalysisReport deleteReportByReportId(long reportId);
}
