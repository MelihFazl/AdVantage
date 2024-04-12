package com.advantage.advantage.services;

import com.advantage.advantage.helpers.IgnoredPropertyCreator;
import com.advantage.advantage.models.*;
import com.advantage.advantage.repositories.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
@Service
public class SingleAnalysisAdReportServiceImplementation implements SingleAnalysisAdReportService{
    @Autowired
    SingleAnalysisReportRepo reportRepo;
    @Autowired
    TeamMemberRepo teamMemberRepo;
    @Autowired
    TextualAdvertisementRepo adRepo;
    @Autowired
    ShapleyValReportAssociationServiceImplementation shapleyValReportAssociationService;

    @Autowired
    TeamRepo teamRepo;
    TextualAdvertisementService textualAdvertisementService;
    private IgnoredPropertyCreator ignoredPropertyCreator;
    @Override
    public List<SingleAdAnalysisReport> getAllReports() {
        return reportRepo.findAll();
    }

    @Override
    public List<SingleAdAnalysisReport> getByReportId(long reportId) {
        return reportRepo.findByReportId(reportId);
    }

    @Override
    public List<SingleAdAnalysisReport> getByUploaderId(long uploaderId) {
        return reportRepo.findByUploaderId(uploaderId);
    }

    @Override
    public List<SingleAdAnalysisReport> getByCreatedAt(Date createdAt) {
        return reportRepo.findByCreatedAt(createdAt);
    }

    @Override
    public List<SingleAdAnalysisReport> getByTitle(String title) {
        return reportRepo.findByTitle(title);
    }

    @Override
    public List<SingleAdAnalysisReport> getByAdvertisement(Advertisement ad) {
        return reportRepo.findByAdvertisement(ad);
    }

    @Override
    public SingleAdAnalysisReport saveAdAnalysisReport(String title, long uploaderId, Date createdAt, String pros, String cons, String overview, float prediction, List<Long> shapleyVal, TextualAdvertisement ad, Long teamId) {
        SingleAdAnalysisReport newReport = new SingleAdAnalysisReport();
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
        newReport.setPros(pros);
        newReport.setCons(cons);
        newReport.setOverview(overview);
        newReport.setSuccessPrediction(prediction);
        newReport.setAdvertisement(ad);
        newReport.setTeam(team);

        if(shapleyVal.isEmpty()){
            System.out.println("There is no shapley values");
            return null;
        }

        try {
            SingleAdAnalysisReport savedReport = reportRepo.save(newReport);
            for(long val: shapleyVal){
                shapleyValReportAssociationService.saveShapleyValReportAssociation(savedReport.getReportId(),val);
            }
            return savedReport;
        } catch (DataAccessException e) {
            System.out.println( e.getMessage());
            return null;
        }
    }

    @Override
    public SingleAdAnalysisReport updateAnalysisReport(SingleAdAnalysisReport editedAnalysisReport, long oldAnalysisReportId) {
        List<SingleAdAnalysisReport> reports = reportRepo.findByReportId(oldAnalysisReportId);
        if(reports == null || reports.isEmpty())
        {
            return null;
        }
        else
        {
            SingleAdAnalysisReport oldReport = reports.get(0);
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
        List<SingleAdAnalysisReport> reports = reportRepo.findByReportId(reportId);
        if(reports == null || reports.isEmpty()){
            return false;
        }
        List<ShapleyValReportAssociation> associations = shapleyValReportAssociationService.getByReportId(reportId);
        if(!associations.isEmpty()){
            for(ShapleyValReportAssociation assoc : associations){
                shapleyValReportAssociationService.deleteAssociationById(assoc.getShapleyValId());
            }
        }
        reportRepo.deleteByReportId(reportId);
        return true;
    }
}

