package com.advantage.advantage.services;

import com.advantage.advantage.helpers.IgnoredPropertyCreator;
import com.advantage.advantage.models.MultipleAdAnalysisReport;
import com.advantage.advantage.models.SingleAdAnalysisReport;
import com.advantage.advantage.models.TeamMember;
import com.advantage.advantage.helpers.IgnoredPropertyCreator;
import com.advantage.advantage.repositories.TeamMemberRepo;
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
    TeamMemberRepo teamMemberRepo;
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
    public List<MultipleAdAnalysisReport> getByUploader(TeamMember uploader) {
        return reportRepo.findByUploader(uploader);
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
    public MultipleAdAnalysisReport saveAdAnalysisReport(String title, Date createdAt, long uploaderId, String comparison) {
        MultipleAdAnalysisReport newReport = new MultipleAdAnalysisReport();
        List<TeamMember> uploaders = teamMemberRepo.findById(uploaderId);
        if (uploaders.isEmpty()){
            System.out.println("The uploader does not exist");
            return null;
        }
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
        if(reports == null)
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
    public MultipleAdAnalysisReport deleteReportByReportId(long reportId) {
        return reportRepo.deleteByReportId(reportId);
    }
}
