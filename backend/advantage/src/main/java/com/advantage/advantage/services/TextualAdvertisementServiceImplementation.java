package com.advantage.advantage.services;

import com.advantage.advantage.helpers.IgnoredPropertyCreator;
import com.advantage.advantage.models.AdCategory;
import com.advantage.advantage.models.Advertisement;
import com.advantage.advantage.models.TextualAdvertisement;
import com.advantage.advantage.models.TeamMember;
import com.advantage.advantage.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
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
    public String saveAdvertisement(AdCategory category, long uploaderId, Date uploadedAt, String adText) {
        TextualAdvertisement ad = new TextualAdvertisement();
        List<TeamMember> uploaders = teamMemberRepo.findById(uploaderId);

        if (uploaders == null){
            return "The uploader does not exist";
        }
        TeamMember uploader = uploaders.get(0);
        if(adText.equals("") ){
            return "Please enter the text of your advertisement";
        }
        ad.setCategory(category);
        ad.setUploader(uploader);
        ad.setUploadedAt(uploadedAt);
        ad.setAdText(adText);
        advertisementRepo.save(ad);
        return "Advertisement " + ad.getAdvertisementId() + "adText " + ad.getAdText()  + "uploader " + ad.getUploader().getName() + "category" + ad.getCategory() + " created";
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
