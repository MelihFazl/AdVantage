package com.advantage.advantage.controllers;

import com.advantage.advantage.models.ShapleyValReportAssociation;
import com.advantage.advantage.models.SingleAdAnalysisReport;
import com.advantage.advantage.services.ShapleyValReportAssociationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shapleyReport")
@CrossOrigin
public class ShapleyValReportAssociationController {
    @Autowired
    ShapleyValReportAssociationService shapleyValReportAssociationService;
    public ShapleyValReportAssociationController(ShapleyValReportAssociationService shapleyValReportAssociationService){
        this.shapleyValReportAssociationService = shapleyValReportAssociationService;
    }
    @GetMapping("/getShapleyValReport")
    public List<ShapleyValReportAssociation> getShapleyValByReportId(@RequestParam long reportId)
    {
        return shapleyValReportAssociationService.getByReportId(reportId);
    }
}
