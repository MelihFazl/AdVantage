package com.advantage.advantage.services;

import com.advantage.advantage.helpers.IgnoredPropertyCreator;
import com.advantage.advantage.models.*;
import com.advantage.advantage.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.beans.BeanUtils;


import java.util.Date;
import java.util.List;
@Service
public class TextualAdvertisementServiceImplementation implements TextualAdvertisementService {

    @Autowired
    TextualAdvertisementRepo advertisementRepo;
    @Autowired
    TeamMemberRepo teamMemberRepo;

    private IgnoredPropertyCreator ignoredPropertyCreator;
    @Override
    public List<TextualAdvertisement> getAllAdvertisements() {

        return advertisementRepo.findAll();
    }

    @Override
    public List<TextualAdvertisement> getByAdvertisementId(long advertisementId) {
        return advertisementRepo.findByAdvertisementId(advertisementId);
    }

    @Override
    public List<TextualAdvertisement> getByUploader(TeamMember uploader) {
        return advertisementRepo.findByUploader(uploader);
    }

    @Override
    public List<TextualAdvertisement> getByCategory(AdCategory category) {
        return advertisementRepo.findByCategory(category);
    }

    @Override
    public List<TextualAdvertisement> getByUploadedAt(Date uploadedAt) {
        return advertisementRepo.findByUploadedAt(uploadedAt);
    }

    @Override
    public TextualAdvertisement saveAdvertisement(AdCategory category, long uploaderId, Date uploadedAt, String adText) {
        TextualAdvertisement ad = new TextualAdvertisement();
        List<TeamMember> uploaders = teamMemberRepo.findById(uploaderId);

        if (uploaders == null){
            System.out.println("The uploader does not exist");
            return null;
        }
        TeamMember uploader = uploaders.get(0);
        if(adText.equals("") ){
            System.out.println("Please enter the text of your advertisement");
            return null;
        }
        ad.setCategory(category);
        ad.setUploader(uploader);
        ad.setUploadedAt(uploadedAt);
        ad.setAdText(adText);
        try {
            return advertisementRepo.save(ad);
        } catch (DataAccessException e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Override
    public TextualAdvertisement updateAdvertisement(TextualAdvertisement editedAdvertisement, long oldAdvertisementId) {
        List<TextualAdvertisement> ads = advertisementRepo.findByAdvertisementId(oldAdvertisementId);
        if(ads == null)
        {
            return null;
        }
        else
        {
            TextualAdvertisement oldAdvertisement = ads.get(0);
            ignoredPropertyCreator = IgnoredPropertyCreator.getInstance();
            ignoredPropertyCreator.setObj(editedAdvertisement);
            String[] ignoredProperties = ignoredPropertyCreator.getNullPropertyNames();
            BeanUtils.copyProperties(editedAdvertisement, oldAdvertisement, ignoredProperties);
            advertisementRepo.save(oldAdvertisement);
            return oldAdvertisement;
        }
    }

    @Override
    public TextualAdvertisement deleteAdvertisementById(long advertisementId) {
        return advertisementRepo.deleteByAdvertisementId(advertisementId);
    }
}
