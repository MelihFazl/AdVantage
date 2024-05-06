package com.advantage.advantage.services;

import com.advantage.advantage.helpers.IgnoredPropertyCreator;
import com.advantage.advantage.models.*;
import com.advantage.advantage.repositories.MultipleAnalysisReportRepo;
import com.advantage.advantage.repositories.MultipleImageAdAnalysisReportAssociationRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class MultipleImgAdAnalysisReportAssociationServiceImplementation implements MultipleImgAdAnalysisReportAssociationService{

    @Autowired
    MultipleImageAdAnalysisReportAssociationRepo associationRepo;

    @Autowired
    MultipleAnalysisReportRepo adReportRepo;

    private IgnoredPropertyCreator ignoredPropertyCreator;

    @Override
    public List<ImageAdvertisementReportAssociation> getAllAssociations() {
        return associationRepo.findAll();
    }

    @Override
    public List<ImageAdvertisementReportAssociation> getByAssociationId(long associationId) {
        return associationRepo.findById(associationId);
    }

    @Override
    public List<ImageAdvertisementReportAssociation> getByReport(MultipleImageAdAnalysisReport report) {
        return associationRepo.findByReport(report);
    }

    @Override
    public List<ImageAdvertisementReportAssociation> getByAdvertisement(ImageAdvertisement ad) {
        return associationRepo.findByAdvertisement(ad);
    }
    public ImageAdvertisement getAdByAssociation(ImageAdvertisementReportAssociation advertisementReportAssociation){
        return advertisementReportAssociation.getAdvertisement();
    }

    @Override
    public ImageAdvertisementReportAssociation saveAdvertisementReportAssociation(ImageAdvertisement ad, MultipleImageAdAnalysisReport report, float pred) {
        ImageAdvertisementReportAssociation newAssociation = new ImageAdvertisementReportAssociation();
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
        newAssociation.setPrediction(0);

        try {
            return associationRepo.save(newAssociation);
        } catch (DataAccessException e) {
            System.out.println( e.getMessage());
            return null;
        }
    }

    @Override
    public ImageAdvertisementReportAssociation updateAdvertisementReportAssociation(ImageAdvertisementReportAssociation editedAssociation, long oldAssociationId) {
        List<ImageAdvertisementReportAssociation> repAdAssociations = associationRepo.findById(oldAssociationId);
        if(repAdAssociations == null || repAdAssociations.isEmpty())
        {
            return null;
        }
        else
        {
            ImageAdvertisementReportAssociation oldAssociation = repAdAssociations.get(0);
            ignoredPropertyCreator = IgnoredPropertyCreator.getInstance();
            ignoredPropertyCreator.setObj(editedAssociation);
            String[] ignoredProperties = ignoredPropertyCreator.getNullPropertyNames();
            BeanUtils.copyProperties(editedAssociation, oldAssociationId, ignoredProperties);
            associationRepo.save(oldAssociation);
            return oldAssociation;
        }
    }

    @Override
    public Long deleteAdvertisementReportAssociationByAssociationId(long associationId) {
        return associationRepo.deleteById(associationId);
    }
}
