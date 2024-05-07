package com.advantage.advantage.services;

import com.advantage.advantage.models.Advertisement;
import com.advantage.advantage.models.ImageAdAnalysisReport;
import com.advantage.advantage.models.ImageAdvertisement;

import java.util.Date;
import java.util.List;

public interface ImageAdAnalysisReportService {
    public List<ImageAdAnalysisReport> getAllReports();

    public List<ImageAdAnalysisReport> getByReportId(long reportId);
    public List<ImageAdAnalysisReport> getByUploaderId(long uploaderId);
    public List<ImageAdAnalysisReport> getByCreatedAt(Date createdAt);
    public List<ImageAdAnalysisReport> getByTitle(String title);
    public List<ImageAdAnalysisReport> getByTeamId(long teamId);


    public List<ImageAdAnalysisReport> getByAdvertisement(Advertisement ad);

    public ImageAdAnalysisReport saveAdAnalysisReport(String title, long uploaderId, Date createdAt, float prediction, ImageAdvertisement ad, Long teamId,
                                                      float genderM,
                                                      float genderF,
                                                      float age1317,
                                                      float age1824,
                                                      float age2534,
                                                      float age3544,
                                                      float age4554,
                                                      float age5564,
                                                      float age65);
    public ImageAdAnalysisReport updateAnalysisReport(ImageAdAnalysisReport editedAnalysisReport, long oldAnalysisReportId);
    public Long deleteReportByReportId(long reportId);
}
