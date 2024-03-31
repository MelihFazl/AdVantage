package com.advantage.advantage.controllers;

import com.advantage.advantage.helpers.JwtUtils;
import com.advantage.advantage.models.*;
import com.advantage.advantage.repositories.MultipleAdAnalysisReportAssociationRepo;
import com.advantage.advantage.services.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.advantage.advantage.repositories.MultipleAnalysisReportRepo;
import com.advantage.advantage.repositories.SingleAnalysisReportRepo;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/analysisReport")
@CrossOrigin
public class AnalysisReportController {

    private final UserAccountManagementService userAccountManagementService;
    private final TextualAdvertisementService advertisementService;
    private final JwtUtils jwtUtils;

    private final MultipleAdAnalysisReportService multipleAdService;

    private final SingleAnalysisAdReportService singleAdService;
    private final MultipleAnalysisReportRepo multipleAnalysisReportRepository;
    private final SingleAnalysisReportRepo singleAnalysisReportRepository;

    @Autowired
    MultipleAdAnalysisReportAssociationService associationService;

    public AnalysisReportController( TextualAdvertisementService advertisementService, MultipleAdAnalysisReportService multipleAdService, SingleAnalysisAdReportService singleAdService, MultipleAnalysisReportRepo multipleAnalysisReportRepository, SingleAnalysisReportRepo singleAnalysisReportRepository, UserAccountManagementService userAccountManagementService) {
        this.advertisementService = advertisementService;
        this.userAccountManagementService = userAccountManagementService;
        this.multipleAnalysisReportRepository = multipleAnalysisReportRepository;
        this.singleAnalysisReportRepository = singleAnalysisReportRepository;
        this.jwtUtils = new JwtUtils(userAccountManagementService);
        this.multipleAdService = multipleAdService;
        this.singleAdService = singleAdService;
    }

    @GetMapping("/getAllByTeamId")
    public  ResponseEntity<?> getAllReports(@RequestParam String token) {

        if(!jwtUtils.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }

        Long userID = jwtUtils.getUserId(token);
        Long teamId = userAccountManagementService.getTeamMemberByID(userID).get(0).getTeam().getTeamId();

        List<SingleAdAnalysisReport> singleReports = singleAnalysisReportRepository.findByUploader_Team_TeamId(teamId);
        List<MultipleAdAnalysisReport> multiReports = multipleAnalysisReportRepository.findByUploader_Team_TeamId(teamId);
        List<Map<String, Object>> result = new ArrayList<>();

        for (SingleAdAnalysisReport singleReport : singleReports) {
            Map<String, Object> reportAndAds = new HashMap<>();

            // Add the type identifier
            reportAndAds.put("type", "SingleAdAnalysisReport");

            // Add the AnalysisReport to the map
            reportAndAds.put("report", singleReport);

            // Add the advertisement text
            reportAndAds.put("advertisementText", singleReport.getAdvertisement().getAdText());

            // Add the combined map to the result
            result.add(reportAndAds);
        }

        for (MultipleAdAnalysisReport multiReport : multiReports) {
            Map<String, Object> reportAndAds = new HashMap<>();

            // Add the type identifier
            reportAndAds.put("type", "MultipleAdAnalysisReport");

            // Add the AnalysisReport to the map
            reportAndAds.put("report", multiReport);

            // Fetch TextualAdvertisements associated with the AnalysisReport
            List<AdvertisementReportAssociation> adsAssoc = associationService.getByReport(multiReport);

            List<String> advertisementTexts = adsAssoc.stream()
                    .map(adsA -> adsA.getAdvertisement().getAdText())
                    .collect(Collectors.toList());

            // Add the advertisement texts
            reportAndAds.put("advertisementTexts", advertisementTexts);

            // Add the combined map to the result
            result.add(reportAndAds);
        }

        return ResponseEntity.ok(result);
    }

    @DeleteMapping ("/delete")
    @Transactional
    public  ResponseEntity<?> deleteReport(@RequestParam String token, @RequestParam long reportId, @RequestParam String reportType) {
        //Check if the token is available
        if(!jwtUtils.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }

        //Additional check mechanism might be required, who can delete the report not all team members can delete the report.
        long requesterId = jwtUtils.getUserId(token);
        long requesterTeamId = userAccountManagementService.getTeamMemberByID(requesterId).get(0).getTeam().getTeamId();

        // Delete the report based on the report type
        switch (reportType) {
            case "MultipleAdAnalysisReport":
                try {
                    long reportTeamId = multipleAdService.getByReportId(reportId).get(0).getUploader().getTeam().getTeamId();
                    if(requesterTeamId != reportTeamId) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You do not have permission to delete this report");
                    }

                    multipleAdService.deleteReportByReportId(reportId);
                    break;
                }catch(Exception e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
                }
            case "SingleAdAnalysisReport":
                try{
                    List <SingleAdAnalysisReport> report = singleAdService.getByReportId(reportId);
                    long reportTeamId = report.get(0).getUploader().getTeam().getTeamId();
                    if(requesterTeamId != reportTeamId) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You do not have permission to delete this report");
                    }
                    TextualAdvertisement ad = report.get(0).getAdvertisement();
                    singleAdService.deleteReportByReportId(reportId);
                    advertisementService.deleteAdvertisementById(ad.getAdvertisementId());
                    break;
                }catch(Exception e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
                }


            default:
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid report type");
        }

        return ResponseEntity.ok().body("Report deleted successfully");

    }

}
