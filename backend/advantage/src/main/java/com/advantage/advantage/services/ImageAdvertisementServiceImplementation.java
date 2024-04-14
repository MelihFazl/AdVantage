package com.advantage.advantage.services;

import com.advantage.advantage.helpers.IgnoredPropertyCreator;
import com.advantage.advantage.models.*;
import com.advantage.advantage.repositories.ImageAdvertisementRepo;
import com.advantage.advantage.repositories.TeamMemberRepo;
import com.advantage.advantage.repositories.TeamRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ImageAdvertisementServiceImplementation implements ImageAdvertisementService{

    @Autowired
    ImageAdvertisementRepo imageAdvertisementRepo;
    @Autowired
    TeamMemberRepo teamMemberRepo;
    @Autowired
    TeamRepo teamRepo;

    @Autowired
    ImageAdvertisementRepo advertisementRepo;
    private IgnoredPropertyCreator ignoredPropertyCreator;
    @Override
    public List<ImageAdvertisement> getAllAdvertisements() {
        return imageAdvertisementRepo.findAll();
    }

    @Override
    public List<ImageAdvertisement> getByAdvertisementId(long advertisementId) {
        return imageAdvertisementRepo.findByAdvertisementId(advertisementId);
    }


    @Override
    public List<ImageAdvertisement> getByUploader(TeamMember uploader) {
        return imageAdvertisementRepo.findByUploader(uploader);
    }

    @Override
    public List<ImageAdvertisement> getByCategory(AdCategory category) {
        return imageAdvertisementRepo.findByCategory(category);
    }

    @Override
    public List<ImageAdvertisement> getByUploadedAt(Date uploadedAt) {
        return imageAdvertisementRepo.findByUploadedAt(uploadedAt);
    }

    @Override
    public ImageAdvertisement saveAdvertisement(AdCategory category, long uploaderId, Date uploadedAt, String imageKey, Long teamId) {
        ImageAdvertisement ad = new ImageAdvertisement();
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

        ad.setCategory(category);
        ad.setUploader(uploader);
        ad.setUploadedAt(uploadedAt);
        ad.setImageKey(imageKey);
        ad.setTeam(team);

        try {
            return advertisementRepo.save(ad);
        } catch (DataAccessException e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Override
    public ImageAdvertisement updateAdvertisement(ImageAdvertisement editedAdvertisement, long oldAdvertisementId) {
        List<ImageAdvertisement> ads = advertisementRepo.findByAdvertisementId(oldAdvertisementId);
        if(ads == null)
        {
            return null;
        }
        else
        {
            ImageAdvertisement oldAdvertisement = ads.get(0);
            ignoredPropertyCreator = IgnoredPropertyCreator.getInstance();
            ignoredPropertyCreator.setObj(editedAdvertisement);
            String[] ignoredProperties = ignoredPropertyCreator.getNullPropertyNames();
            BeanUtils.copyProperties(editedAdvertisement, oldAdvertisement, ignoredProperties);
            advertisementRepo.save(oldAdvertisement);
            return oldAdvertisement;
        }
    }

    @Override
    public long deleteAdvertisementById(long advertisementId) {
        return  advertisementRepo.deleteByAdvertisementId(advertisementId);
    }
}
