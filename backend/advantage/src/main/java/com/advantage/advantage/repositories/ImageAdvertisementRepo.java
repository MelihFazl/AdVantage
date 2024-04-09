package com.advantage.advantage.repositories;

import com.advantage.advantage.models.AdCategory;
import com.advantage.advantage.models.ImageAdvertisement;
import com.advantage.advantage.models.TeamMember;
import com.advantage.advantage.models.TextualAdvertisement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ImageAdvertisementRepo extends JpaRepository<ImageAdvertisement, Long> {
    public List<ImageAdvertisement> findAll();

    public List<ImageAdvertisement> findByAdvertisementId(long advertisementId);
    public long deleteByAdvertisementId(long advertisementId);

    public List<ImageAdvertisement> findByUploader(TeamMember uploader);
    public List<ImageAdvertisement> findByCategory(AdCategory category);
    public List<ImageAdvertisement> findByUploadedAt(Date uploadedAt);
    public List<ImageAdvertisement> findByAdText(String adText);

}
