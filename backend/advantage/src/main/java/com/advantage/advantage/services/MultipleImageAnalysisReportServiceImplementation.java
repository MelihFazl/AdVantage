package com.advantage.advantage.services;

import com.advantage.advantage.helpers.IgnoredPropertyCreator;
import com.advantage.advantage.models.*;
import com.advantage.advantage.repositories.MultipleAnalysisReportRepo;
import com.advantage.advantage.repositories.MultipleImageAdAnalysisReportRepo;
import com.advantage.advantage.repositories.TeamMemberRepo;
import com.advantage.advantage.repositories.TeamRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.Date;
import java.util.List;
@Service
public class MultipleImageAnalysisReportServiceImplementation implements  MultipleImageAdAnalysisReportService{

    @Autowired
    MultipleImageAdAnalysisReportRepo reportRepo;

    @Autowired
    ImageAdvertisementService advertisementService;

    @Autowired
    MultipleImgAdAnalysisReportAssociationService associationService;

    @Autowired
    TeamMemberRepo teamMemberRepo;

    @Autowired
    TeamRepo teamRepo;
    private IgnoredPropertyCreator ignoredPropertyCreator;

    @Override
    public List<MultipleImageAdAnalysisReport> getAllReports() {
        return reportRepo.findAll();
    }

    @Override
    public List<MultipleImageAdAnalysisReport> getByReportId(long reportId) {
        return reportRepo.findByReportId(reportId);
    }

    @Override
    public List<MultipleImageAdAnalysisReport> getByUploaderId(long uploaderId) {
        return reportRepo.findByUploader_Id(uploaderId);
    }

    @Override
    public List<MultipleImageAdAnalysisReport> getByCreatedAt(Date createdAt) {
        return reportRepo.findByCreatedAt(createdAt);
    }

    @Override
    public List<MultipleImageAdAnalysisReport> getByTitle(String title) {
        return reportRepo.findByTitle(title);
    }

    @Override
    public List<MultipleImageAdAnalysisReport> getByTeamId(long teamId) {
        return reportRepo.findByTeam_TeamId(teamId);
    }

    @Override
    public MultipleImageAdAnalysisReport saveAdAnalysisReport(String title, Date createdAt, long uploaderId, String comparison, Long teamId) {
        MultipleImageAdAnalysisReport newReport = new MultipleImageAdAnalysisReport();
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

        Team team = teams.get(0);
        TeamMember uploader = uploaders.get(0);
        if(title.equals("")){
            System.out.println("Please enter valid title");
            return null;
        }

        if(createdAt == null){
            System.out.println("There is not valid date");
            return null;
        }

        newReport.setTitle(title);
        newReport.setUploader(uploader);
        newReport.setCreatedAt(createdAt);
        newReport.setComparison(comparison);
        newReport.setTeam(team);

        try {
            return reportRepo.save(newReport);
        } catch (DataAccessException e) {
            System.out.println( e.getMessage());
            return null;
        }
    }

    @Override
    public MultipleImageAdAnalysisReport updateAnalysisReport(MultipleImageAdAnalysisReport editedAnalysisReport, long oldAnalysisReportId) {
        List<MultipleImageAdAnalysisReport> reports = reportRepo.findByReportId(oldAnalysisReportId);
        if(reports == null || reports.isEmpty())
        {
            return null;
        }
        else
        {
            MultipleImageAdAnalysisReport oldReport = reports.get(0);
            ignoredPropertyCreator = IgnoredPropertyCreator.getInstance();
            ignoredPropertyCreator.setObj(editedAnalysisReport);
            String[] ignoredProperties = ignoredPropertyCreator.getNullPropertyNames();
            BeanUtils.copyProperties(editedAnalysisReport, oldAnalysisReportId, ignoredProperties);
            reportRepo.save(oldReport);
            return oldReport;
        }
    }

    @Override
    public boolean deleteReportByReportId(long reportId) {
        List<MultipleImageAdAnalysisReport> reports = reportRepo.findByReportId(reportId);
        if(reports == null || reports.isEmpty())
        {
            return false;
        }
        MultipleImageAdAnalysisReport deletedReport = reports.get(0);
        List<ImageAdvertisementReportAssociation> associations = associationService.getByReport(deletedReport);
        for( ImageAdvertisementReportAssociation  association : associations){
            ImageAdvertisement ad = association.getAdvertisement();
            advertisementService.deleteAdvertisementById(ad.getAdvertisementId());
            associationService.deleteAdvertisementReportAssociationByAssociationId(association.getId());
        }
        reportRepo.deleteByReportId(reportId);
        return true;
    }
}
