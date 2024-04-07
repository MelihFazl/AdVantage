package com.advantage.advantage.services;


import com.advantage.advantage.models.AdCategory;
import com.advantage.advantage.models.TextualAdvertisement;
import com.advantage.advantage.models.TeamMember;

import java.util.Date;
import java.util.List;

public interface TextualAdvertisementService {
    public List<TextualAdvertisement> getAllAdvertisements();

    public List<TextualAdvertisement> getByAdvertisementId(long advertisementId);

    public List<TextualAdvertisement> getByUploader(TeamMember uploader);

    public List<TextualAdvertisement> getByCategory(AdCategory category);
    public List<TextualAdvertisement> getByUploadedAt(Date uploadedAt);
    public TextualAdvertisement saveAdvertisement(AdCategory category, long uploaderId, Date uploadedAt, String adText, Long teamId);
    public TextualAdvertisement updateAdvertisement(TextualAdvertisement editedAdvertisement, long oldAdvertisementId);
    public long deleteAdvertisementById(long advertisementId);
    }
