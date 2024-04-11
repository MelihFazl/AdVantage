package com.advantage.advantage.services;

import com.advantage.advantage.models.AdCategory;
import com.advantage.advantage.models.ImageAdvertisement;
import com.advantage.advantage.models.TeamMember;

import java.util.Date;
import java.util.List;

public interface ImageAdvertisementService {
    public List<ImageAdvertisement> getAllAdvertisements();

    public List<ImageAdvertisement> getByAdvertisementId(long advertisementId);

    public List<ImageAdvertisement> getByUploader(TeamMember uploader);

    public List<ImageAdvertisement> getByCategory(AdCategory category);
    public List<ImageAdvertisement> getByUploadedAt(Date uploadedAt);
    public ImageAdvertisement saveAdvertisement(AdCategory category, long uploaderId, Date uploadedAt, String imageKey, Long teamId);
    public ImageAdvertisement updateAdvertisement(ImageAdvertisement editedAdvertisement, long oldAdvertisementId);
    public long deleteAdvertisementById(long advertisementId);
}
