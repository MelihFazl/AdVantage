package com.advantage.advantage.services;

import com.advantage.advantage.models.*;

import java.util.Date;
import java.util.List;

public interface MultipleAdAnalysisReportAssociationService {
    public List<AdvertisementReportAssociation> getAllAssociations();
    public List<AdvertisementReportAssociation> getByAssociationId(long associationId);
    public List<AdvertisementReportAssociation> getByReport(MultipleAdAnalysisReport report);
    public List<AdvertisementReportAssociation> getByAdvertisement(TextualAdvertisement ad);
    public String saveAdvertisementReportAssociation(TextualAdvertisement ad, MultipleAdAnalysisReport report, String pros, String cons, float pred);
    public MultipleAdAnalysisReport updateAdvertisementReportAssociation(AdvertisementReportAssociation editedAssociation, long oldAssociationId);
    public MultipleAdAnalysisReport deleteAdvertisementReportAssociationByAssociationId(long associationId);
}
