package com.advantage.advantage.services;

import com.advantage.advantage.helpers.IgnoredPropertyCreator;
import com.advantage.advantage.models.MultipleAdAnalysisReport;
import com.advantage.advantage.models.SingleAdAnalysisReport;
import com.advantage.advantage.models.Team;
import com.advantage.advantage.models.TeamMember;

import com.advantage.advantage.models.*;

import com.advantage.advantage.helpers.IgnoredPropertyCreator;
import com.advantage.advantage.repositories.TeamMemberRepo;
import com.advantage.advantage.repositories.TeamRepo;
import org.springframework.beans.BeanUtils;


import java.util.Date;
import java.util.List;

import com.advantage.advantage.repositories.MultipleAnalysisReportRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

@Service
public class MultipleAdAnalysisReportServiceImplementation implements MultipleAdAnalysisReportService{

    @Autowired
    MultipleAnalysisReportRepo reportRepo;

    @Autowired
    MultipleAdAnalysisReportAssociationService associationService;

    @Autowired
    TextualAdvertisementService advertisementService;

    @Autowired
    TeamMemberRepo teamMemberRepo;

    @Autowired
    TeamRepo teamRepo;
    private IgnoredPropertyCreator ignoredPropertyCreator;

    @Override
    public List<MultipleAdAnalysisReport> getAllReports() {
        return reportRepo.findAll();
    }

    @Override
    public List<MultipleAdAnalysisReport> getByReportId(long reportId) {
        return reportRepo.findByReportId(reportId);
    }

    @Override
    public List<MultipleAdAnalysisReport> getByUploaderId(long uploaderId) {
        return reportRepo.findByUploaderId(uploaderId);
    }

    @Override
    public List<MultipleAdAnalysisReport> getByCreatedAt(Date createdAt) {
        return reportRepo.findByCreatedAt(createdAt);
    }

    @Override
    public List<MultipleAdAnalysisReport> getByTitle(String title) {
        return reportRepo.findByTitle(title);
    }

    @Override
    public List<MultipleAdAnalysisReport> getByTeamId(long teamId) {
        return reportRepo.findByTeam_TeamId(teamId);
    }

    @Override
    public MultipleAdAnalysisReport saveAdAnalysisReport(String title, Date createdAt, long uploaderId, String comparison, Long teamId) {
        MultipleAdAnalysisReport newReport = new MultipleAdAnalysisReport();
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
    public MultipleAdAnalysisReport updateAnalysisReport(MultipleAdAnalysisReport editedAnalysisReport, long oldAnalysisReportId) {
        List<MultipleAdAnalysisReport> reports = reportRepo.findByReportId(oldAnalysisReportId);
        if(reports == null || reports.isEmpty())
        {
            return null;
        }
        else
        {
            MultipleAdAnalysisReport oldReport = reports.get(0);
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
        List<MultipleAdAnalysisReport> reports = reportRepo.findByReportId(reportId);
        if(reports == null || reports.isEmpty())
        {
            return false;
        }
        MultipleAdAnalysisReport deletedReport = reports.get(0);
        List<AdvertisementReportAssociation> associations = associationService.getByReport(deletedReport);
        for( AdvertisementReportAssociation  association : associations){
            TextualAdvertisement ad = association.getAdvertisement();
            advertisementService.deleteAdvertisementById(ad.getAdvertisementId());
            associationService.deleteAdvertisementReportAssociationByAssociationId(association.getId());
        }
        reportRepo.deleteByReportId(reportId);
        return true;
    }
}
