package com.advantage.advantage.services;

import com.advantage.advantage.helpers.IgnoredPropertyCreator;
import com.advantage.advantage.models.*;
import com.advantage.advantage.repositories.ImageAnalysisReportRepo;
import com.advantage.advantage.repositories.TeamMemberRepo;
import com.advantage.advantage.repositories.TeamRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

@Service
public class ImageAdAnalysisReportServiceImplementation implements ImageAdAnalysisReportService{
    private IgnoredPropertyCreator ignoredPropertyCreator;
    @Autowired
    ImageAnalysisReportRepo imageAnalysisReportRepo;

    @Autowired
    TeamMemberRepo teamMemberRepo;

    @Autowired
    TeamRepo teamRepo;
    @Override
    public List<ImageAdAnalysisReport> getAllReports() {
        return imageAnalysisReportRepo.findAll();
    }

    @Override
    public List<ImageAdAnalysisReport> getByReportId(long reportId) {
        return imageAnalysisReportRepo.findByReportId(reportId);
    }

    @Override
    public List<ImageAdAnalysisReport> getByUploaderId(long uploaderId) {
        return imageAnalysisReportRepo.findByUploaderId(uploaderId);
    }

    @Override
    public List<ImageAdAnalysisReport> getByCreatedAt(Date createdAt) {
        return imageAnalysisReportRepo.findByCreatedAt(createdAt);
    }

    @Override
    public List<ImageAdAnalysisReport> getByTitle(String title) {
        return imageAnalysisReportRepo.findByTitle(title);
    }

    @Override
    public List<ImageAdAnalysisReport> getByTeamId(long teamId) {
        return imageAnalysisReportRepo.findByTeam_TeamId(teamId);
    }

    @Override
    public List<ImageAdAnalysisReport> getByAdvertisement(Advertisement ad) {
        return imageAnalysisReportRepo.findByAdvertisement(ad);
    }

    @Override
    public ImageAdAnalysisReport saveAdAnalysisReport(String title, long uploaderId, Date createdAt, float prediction, ImageAdvertisement ad, Long teamId,
                                                      float genderM,
                                                      float genderF,
                                                      float age1317,
                                                      float age1824,
                                                      float age2534,
                                                      float age3544,
                                                      float age4554,
                                                      float age5564,
                                                      float age65) {
        ImageAdAnalysisReport newReport = new ImageAdAnalysisReport();
        List<TeamMember> uploaders = teamMemberRepo.findById(uploaderId);
        if (uploaders == null || uploaders.isEmpty()){
            System.out.println("The uploader does not exist");
            return null;
        }

        List<Team> teams = teamRepo.findByTeamId(teamId);
        if (teams == null || teams.isEmpty()){
            System.out.println("The team does not exist");
            return null;
        }

        TeamMember uploader = uploaders.get(0);
        Team team = teams.get(0);

        if(title.equals("")){
            System.out.println("Please enter valid title");
            return null;
        }

        if(createdAt == null){
            System.out.println("There is not valid date");
            return null;
        }
        if(ad == null){
            System.out.println("There is not valid advertisement");
            return null;
        }
        newReport.setTitle(title);
        newReport.setUploader(uploader);
        newReport.setCreatedAt(createdAt);
        newReport.setPrediction(prediction);
        newReport.setAdvertisement(ad);
        newReport.setTeam(team);
        newReport.setGenderM(genderM);
        newReport.setGenderF(genderF);
        newReport.setAge65(age65);
        newReport.setAge5564(age5564);
        newReport.setAge4554(age4554);
        newReport.setAge3544(age3544);
        newReport.setAge2534(age2534);
        newReport.setAge1824(age1824);

        try {
            ImageAdAnalysisReport savedReport = imageAnalysisReportRepo.save(newReport);
            return savedReport;
        } catch (DataAccessException e) {
            System.out.println( e.getMessage());
            return null;
        }
    }

    @Override
    public ImageAdAnalysisReport updateAnalysisReport(ImageAdAnalysisReport editedAnalysisReport, long oldAnalysisReportId) {
        List<ImageAdAnalysisReport> reports = imageAnalysisReportRepo.findByReportId(oldAnalysisReportId);
        if(reports == null || reports.isEmpty())
        {
            return null;
        }
        else
        {
            ImageAdAnalysisReport oldReport = reports.get(0);
            ignoredPropertyCreator = IgnoredPropertyCreator.getInstance();
            ignoredPropertyCreator.setObj(editedAnalysisReport);
            String[] ignoredProperties = ignoredPropertyCreator.getNullPropertyNames();
            BeanUtils.copyProperties(editedAnalysisReport, oldAnalysisReportId, ignoredProperties);
            imageAnalysisReportRepo.save(oldReport);
            return oldReport;
        }
    }

    @Override
    public Long deleteReportByReportId(long reportId) {
        List<ImageAdAnalysisReport> reports = imageAnalysisReportRepo.findByReportId(reportId);
        if(reports == null || reports.isEmpty()){
            System.out.println("There is no report with this id");
            return 0L;
        }

        return imageAnalysisReportRepo.deleteByReportId(reportId);
    }
}
