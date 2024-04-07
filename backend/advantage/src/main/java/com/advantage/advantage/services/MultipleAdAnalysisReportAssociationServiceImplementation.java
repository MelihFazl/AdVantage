package com.advantage.advantage.services;

import com.advantage.advantage.helpers.IgnoredPropertyCreator;
import com.advantage.advantage.models.AdvertisementReportAssociation;
import com.advantage.advantage.models.MultipleAdAnalysisReport;
import com.advantage.advantage.models.TeamMember;
import com.advantage.advantage.models.TextualAdvertisement;
import com.advantage.advantage.repositories.MultipleAdAnalysisReportAssociationRepo;
import com.advantage.advantage.repositories.MultipleAnalysisReportRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class MultipleAdAnalysisReportAssociationServiceImplementation implements MultipleAdAnalysisReportAssociationService{
    @Autowired
    MultipleAdAnalysisReportAssociationRepo associationRepo;

    @Autowired
    MultipleAnalysisReportRepo adReportRepo;

    private IgnoredPropertyCreator ignoredPropertyCreator;

    @Override
    public List<AdvertisementReportAssociation> getAllAssociations() {
        return associationRepo.findAll();
    }

    @Override
    public List<AdvertisementReportAssociation> getByAssociationId(long associationId) {
        return associationRepo.findById(associationId);
    }

    @Override
    public List<AdvertisementReportAssociation> getByReport(MultipleAdAnalysisReport report) {
        return associationRepo.findByReport(report);
    }

    @Override
    public List<AdvertisementReportAssociation> getByAdvertisement(TextualAdvertisement ad) {
        return associationRepo.findByAdvertisement(ad);
    }
    public TextualAdvertisement getAdByAssociation(AdvertisementReportAssociation advertisementReportAssociation){

        TextualAdvertisement ad= advertisementReportAssociation.getAdvertisement();
        return ad;
    }

    @Override
    public AdvertisementReportAssociation saveAdvertisementReportAssociation(TextualAdvertisement ad, MultipleAdAnalysisReport report, String pros, String cons, float pred) {
        AdvertisementReportAssociation newAssociation = new AdvertisementReportAssociation();
        if (report == null){
            System.out.println("The report does not exist");
            return null;
        }
        if (ad == null){
            System.out.println("The report does not exist");
            return null;
        }

        newAssociation.setAdvertisement(ad);
        newAssociation.setReport(report);
        newAssociation.setPros("");
        newAssociation.setCons("");
        newAssociation.setPrediction(0);

        try {
            return associationRepo.save(newAssociation);
        } catch (DataAccessException e) {
            System.out.println( e.getMessage());
            return null;
        }
    }

    @Override
    public AdvertisementReportAssociation updateAdvertisementReportAssociation(AdvertisementReportAssociation editedAssociation, long oldAssociationId) {
        List<AdvertisementReportAssociation> repAdAssociations = associationRepo.findById(oldAssociationId);
        if(repAdAssociations == null || repAdAssociations.isEmpty())
        {
            return null;
        }
        else
        {
            AdvertisementReportAssociation oldAssociation = repAdAssociations.get(0);
            ignoredPropertyCreator = IgnoredPropertyCreator.getInstance();
            ignoredPropertyCreator.setObj(editedAssociation);
            String[] ignoredProperties = ignoredPropertyCreator.getNullPropertyNames();
            BeanUtils.copyProperties(editedAssociation, oldAssociationId, ignoredProperties);
            associationRepo.save(oldAssociation);
            return oldAssociation;
        }
    }

    @Override
    public AdvertisementReportAssociation deleteAdvertisementReportAssociationByAssociationId(long associationId) {
        return associationRepo.deleteById(associationId);
    }
}
