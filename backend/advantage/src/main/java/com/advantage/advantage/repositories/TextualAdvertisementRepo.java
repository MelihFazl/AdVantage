package com.advantage.advantage.repositories;

import com.advantage.advantage.models.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface TextualAdvertisementRepo extends JpaRepository<TextualAdvertisement, Long> {
    public List<TextualAdvertisement> findAll();

    public List<TextualAdvertisement> findByAdvertisementId(long advertisementId);
    public TextualAdvertisement deleteByAdvertisementId(long advertisementId);

    public List<TextualAdvertisement> findByUploader(TeamMember uploader);
    public List<TextualAdvertisement> findByCategory(AdCategory category);
    public List<TextualAdvertisement> findByUploadedAt(Date uploadedAt);
    public List<TextualAdvertisement> findByAdText(String adText);

    }
