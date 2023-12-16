package com.advantage.advantage.controllers;

import com.advantage.advantage.helpers.AdRequestsWrapper;
import com.advantage.advantage.models.*;
import com.advantage.advantage.repositories.MultipleAdAnalysisReportAssociationRepo;
import com.advantage.advantage.services.MultipleAdAnalysisReportAssociationService;
import com.advantage.advantage.services.MultipleAdAnalysisReportService;
import com.advantage.advantage.services.SingleAnalysisAdReportService;
import com.advantage.advantage.services.TextualAdvertisementService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/multipleanalysisreport")
@CrossOrigin
public class MultipleAdAnalysisReportController {

    @Autowired
    MultipleAdAnalysisReportService repService;
    @Autowired
    TextualAdvertisementService textAdService;

    @Autowired
    MultipleAdAnalysisReportAssociationService adReportService;

    @Autowired
    MultipleAdAnalysisReportAssociationService associationService;

    @PostMapping("/create")
    public ResponseEntity<String> createMultipleAnalysisReport(@RequestParam String title, @RequestParam AdCategory category, @RequestParam long uploaderId, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date createdAt,
                                                               @RequestBody AdRequestsWrapper adRequestsWrapper) {
        List<String> adRequests = adRequestsWrapper.getAdRequests();

        MultipleAdAnalysisReport newReport = repService.saveAdAnalysisReport(title, createdAt, uploaderId,"");

        if (createdAt == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("There is not a valid date");
        }

        if (title.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please enter a title");
        }

        if (category == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please specify a category");
        }

        MultipleAdAnalysisReport newReport = repService.saveAdAnalysisReport(title, createdAt, uploaderId, "");

        if (newReport == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("There is an error creating the report");
        }

        for (String adRequest : adRequests) {
            TextualAdvertisement newTextAd = textAdService.saveAdvertisement(category, uploaderId, createdAt, adRequest);
            AdvertisementReportAssociation newAssociation = adReportService.saveAdvertisementReportAssociation(newTextAd, newReport, "", "", 0);

            if (newAssociation == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("There is an error creating the association");
            }
        }

        return ResponseEntity.status(HttpStatus.OK).body("Success");
    }

    @GetMapping("/allreports")
    public List<MultipleAdAnalysisReport> getAllReports()
    {
        return repService.getAllReports();
    }

    @GetMapping("/userreports")
    public List<MultipleAdAnalysisReport> getReportsByUploaderId(@RequestParam long uploaderId)
    {
        return repService.getByUploaderId(uploaderId);
    }
}



