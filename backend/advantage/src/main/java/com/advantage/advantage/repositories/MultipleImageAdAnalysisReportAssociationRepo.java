package com.advantage.advantage.repositories;
import com.advantage.advantage.models.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MultipleImageAdAnalysisReportAssociationRepo extends JpaRepository<ImageAdvertisementReportAssociation, Long> {
    public List<ImageAdvertisementReportAssociation> findAll();

    public List<ImageAdvertisementReportAssociation> findById(long id);

    public List<ImageAdvertisementReportAssociation>  findByReport(MultipleImageAdAnalysisReport adReport);
    public Long deleteById(long id);
    public List<ImageAdvertisementReportAssociation> findByAdvertisement(ImageAdvertisement advertisement);
}
