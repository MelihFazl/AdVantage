package com.advantage.advantage.services;

import com.advantage.advantage.models.Advertisement;
import com.advantage.advantage.models.ShapleyValReportAssociation;
import com.advantage.advantage.models.SingleAdAnalysisReport;
import com.advantage.advantage.models.TextualAdvertisement;

import java.util.Date;
import java.util.List;

public interface ShapleyValReportAssociationService {
    public List<ShapleyValReportAssociation> getAllAssociations();

    public List<ShapleyValReportAssociation> getById(long id);
    public List<ShapleyValReportAssociation> getByReportId(long reportId);

    public ShapleyValReportAssociation saveShapleyValReportAssociation(long reportId, long shapleyVal);
    public void deleteAssociationById(long id);
}
