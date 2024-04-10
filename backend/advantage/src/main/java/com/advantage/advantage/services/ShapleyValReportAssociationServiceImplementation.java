package com.advantage.advantage.services;

import com.advantage.advantage.models.ShapleyValReportAssociation;
import com.advantage.advantage.models.SingleAdAnalysisReport;
import com.advantage.advantage.repositories.ShapleyValReportAssociationRepo;
import com.advantage.advantage.repositories.SingleAnalysisReportRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShapleyValReportAssociationServiceImplementation implements ShapleyValReportAssociationService{
    @Autowired
    ShapleyValReportAssociationRepo assocRepo;
    @Autowired
    SingleAnalysisReportRepo singleReportRepo;
    @Override
    public List<ShapleyValReportAssociation> getAllAssociations() {
        return assocRepo.findAll();
    }

    @Override
    public List<ShapleyValReportAssociation> getById(long id) {
        return  assocRepo.findByShapleyValId(id);
    }

    @Override
    public List<ShapleyValReportAssociation> getByReportId(long reportId) {
        return assocRepo.findByReport(singleReportRepo.findByReportId(reportId).get(0));
    }

    @Override
    public ShapleyValReportAssociation saveShapleyValReportAssociation(long reportId, long shapleyVal) {
        ShapleyValReportAssociation newAssoc = new ShapleyValReportAssociation();
        List<SingleAdAnalysisReport> reports = singleReportRepo.findByReportId(reportId);
        if(reports == null || reports.isEmpty()){
            System.out.println("There is no report with this id");
            return null;
        }

        newAssoc.setShapleyVal(shapleyVal);
        newAssoc.setReport(reports.get(0));
        assocRepo.save(newAssoc);
        return newAssoc;
    }

    @Override
    public void deleteAssociationById(long id) {

    }
}
