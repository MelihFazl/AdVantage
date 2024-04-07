package com.advantage.advantage.services;

import com.advantage.advantage.models.*;

import java.util.Date;
import java.util.List;

public interface MultipleAdAnalysisReportService {
    public List<MultipleAdAnalysisReport> getAllReports();
    public List<MultipleAdAnalysisReport> getByReportId(long reportId);
    public List<MultipleAdAnalysisReport> getByUploaderId(long uploaderId);
    public List<MultipleAdAnalysisReport> getByCreatedAt(Date createdAt);
    public List<MultipleAdAnalysisReport> getByTitle(String title);
    public MultipleAdAnalysisReport saveAdAnalysisReport(String title, Date createdAt, long uploaderId, String comparison, Long teamId);
    public MultipleAdAnalysisReport updateAnalysisReport(MultipleAdAnalysisReport editedAnalysisReport, long oldAnalysisReportId);
    public boolean deleteReportByReportId(long reportId);
}
