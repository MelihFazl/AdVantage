package com.advantage.advantage.services;

import com.advantage.advantage.models.*;

import java.util.List;

public interface MultipleImgAdAnalysisReportAssociationService {

    public List<ImageAdvertisementReportAssociation> getAllAssociations();
    public List<ImageAdvertisementReportAssociation> getByAssociationId(long associationId);
    public List<ImageAdvertisementReportAssociation> getByReport(MultipleImageAdAnalysisReport report);
    public List<ImageAdvertisementReportAssociation> getByAdvertisement(ImageAdvertisement ad);
    public ImageAdvertisementReportAssociation saveAdvertisementReportAssociation(ImageAdvertisement ad, MultipleImageAdAnalysisReport report, float pred);
    public ImageAdvertisementReportAssociation updateAdvertisementReportAssociation(ImageAdvertisementReportAssociation editedAssociation, long oldAssociationId);
    public Long deleteAdvertisementReportAssociationByAssociationId(long associationId);
}
