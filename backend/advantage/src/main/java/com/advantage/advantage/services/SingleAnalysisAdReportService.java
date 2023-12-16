package com.advantage.advantage.services;

import com.advantage.advantage.models.*;

import java.util.Date;
import java.util.List;

public interface SingleAnalysisAdReportService {
    public List<SingleAdAnalysisReport> getAllReports();

    public List<SingleAdAnalysisReport> getByReportId(long reportId);
    public List<SingleAdAnalysisReport> getByUploaderId(long uploaderId);
    public List<SingleAdAnalysisReport> getByCreatedAt(Date createdAt);
    public List<SingleAdAnalysisReport> getByTitle(String title);

    public List<SingleAdAnalysisReport> getByAdvertisement(Advertisement ad);

    public SingleAdAnalysisReport saveAdAnalysisReport(String title, long uploaderId, Date createdAt,  String pros, String cons, String overview, float prediction, TextualAdvertisement ad);
    public SingleAdAnalysisReport updateAnalysisReport(SingleAdAnalysisReport editedAnalysisReport, long oldAnalysisReportId);
    public SingleAdAnalysisReport deleteReportByReportId(long reportId);
}
