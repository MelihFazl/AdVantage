package com.advantage.advantage.repositories;

import com.advantage.advantage.models.AdvertisementReportAssociation;
import com.advantage.advantage.models.MultipleAdAnalysisReport;
import com.advantage.advantage.models.TextualAdvertisement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MultipleAdAnalysisReportAssociationRepo extends JpaRepository<AdvertisementReportAssociation, Long> {

    public List<AdvertisementReportAssociation> findAll();

    public List<AdvertisementReportAssociation> findById(long id);
    public List<AdvertisementReportAssociation>  findByReport(MultipleAdAnalysisReport adReport);
    public AdvertisementReportAssociation deleteById(long id);
    public List<AdvertisementReportAssociation> findByAdvertisement(TextualAdvertisement advertisement);
    public List<AdvertisementReportAssociation> findByPros(String pros);
    public List<AdvertisementReportAssociation> findByCons(String cons);
}
