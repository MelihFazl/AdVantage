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

    public List<SingleAdAnalysisReport> getByTeamId(long teamId);


    public List<SingleAdAnalysisReport> getByAdvertisement(Advertisement ad);

    public SingleAdAnalysisReport saveAdAnalysisReport(String title, long uploaderId, Date createdAt, float prediction, String overview, float spend,String tone, float genderM, float genderF, float age1317, float age1824, float age2534, float age3544,float age4554,float age5564,float age65, TextualAdvertisement ad, Long teamId);
    public SingleAdAnalysisReport updateAnalysisReport(SingleAdAnalysisReport editedAnalysisReport, long oldAnalysisReportId);
    public boolean deleteReportByReportId(long reportId);
}
