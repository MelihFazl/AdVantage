package com.advantage.advantage.controllers;

import com.advantage.advantage.helpers.JwtUtils;
import com.advantage.advantage.models.*;
import com.advantage.advantage.repositories.ImageAnalysisReportRepo;
import com.advantage.advantage.repositories.MultipleAdAnalysisReportAssociationRepo;
import com.advantage.advantage.services.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.advantage.advantage.repositories.MultipleAnalysisReportRepo;
import com.advantage.advantage.repositories.SingleAnalysisReportRepo;
import org.springframework.http.HttpStatus;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/analysisReport")
@CrossOrigin
public class AnalysisReportController {

    private final UserAccountManagementService userAccountManagementService;
    private final TextualAdvertisementService advertisementService;
    private final ImageAdvertisementService imageAdvertisementService;
    private final JwtUtils jwtUtils;

    private final MultipleAdAnalysisReportService multipleAdService;

    private final ImageAdAnalysisReportService imageAdAnalysisReportService;

    private final MultipleImageAdAnalysisReportService multipleImageAdAnalysisReportService;

    private final MultipleImgAdAnalysisReportAssociationService imageAssociationService;

    private final SingleAnalysisAdReportService singleAdService;

    @Autowired
    MultipleAdAnalysisReportAssociationService associationService;

    public AnalysisReportController( ImageAdvertisementService imageAdvertisementService,ImageAnalysisReportRepo imageAnalysisReportRepo,  ImageAdAnalysisReportService imageAdAnalysisReportService,TextualAdvertisementService advertisementService, MultipleAdAnalysisReportService multipleAdService, SingleAnalysisAdReportService singleAdService, MultipleAnalysisReportRepo multipleAnalysisReportRepository, SingleAnalysisReportRepo singleAnalysisReportRepository, UserAccountManagementService userAccountManagementService, MultipleImageAdAnalysisReportService multipleImageAdAnalysisReportService, MultipleImgAdAnalysisReportAssociationService imageAssociationService) {
        this.imageAdvertisementService = imageAdvertisementService;
        this.advertisementService = advertisementService;
        this.imageAdAnalysisReportService = imageAdAnalysisReportService;
        this.userAccountManagementService = userAccountManagementService;
        this.jwtUtils = new JwtUtils(userAccountManagementService);
        this.multipleAdService = multipleAdService;
        this.singleAdService = singleAdService;
        this.multipleImageAdAnalysisReportService = multipleImageAdAnalysisReportService;
        this.imageAssociationService = imageAssociationService;
    }

    @GetMapping("/getAllByTeamId")
    public  ResponseEntity<?> getAllReports(@RequestParam String token, @RequestParam Long teamId) {

        if(!jwtUtils.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }

        Long userID = jwtUtils.getUserId(token);
        List<Team> userTeams = userAccountManagementService.getTeamMemberByID(userID).get(0).getTeams();

        boolean isAuthorized = false;
        for(Team team : userTeams){
            if(Objects.equals(team.getTeamId(), teamId)) {
                isAuthorized = true;
                break;
            }
        }

        if(!isAuthorized) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized request");
        }

        List<SingleAdAnalysisReport> singleReports = singleAdService.getByTeamId(teamId);
        List<MultipleAdAnalysisReport> multiReports = multipleAdService.getByTeamId(teamId);
        List<ImageAdAnalysisReport> imageReports = imageAdAnalysisReportService.getByTeamId(teamId);
        List<MultipleImageAdAnalysisReport> multiImageReports = multipleImageAdAnalysisReportService.getByTeamId(teamId);
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

        for (ImageAdAnalysisReport report : imageReports) {
            Map<String, Object> reportAndAds = new HashMap<>();

            // Add the type identifier
            reportAndAds.put("type", "ImageAdAnalysisReport");

            // Add the AnalysisReport to the map
            reportAndAds.put("report", report);

            // Add the advertisement image
            reportAndAds.put("advertisementImage", report.getAdvertisement().getImageKey());

            // Add the combined map to the result
            result.add(reportAndAds);
        }

        for (MultipleImageAdAnalysisReport report : multiImageReports) {
            Map<String, Object> reportAndAds = new HashMap<>();

            // Add the type identifier
            reportAndAds.put("type", "MultipleImageAdAnalysisReport");

            // Add the AnalysisReport to the map
            reportAndAds.put("report", report);

            // Fetch TextualAdvertisements associated with the AnalysisReport
            List<ImageAdvertisementReportAssociation> adsAssoc = imageAssociationService.getByReport(report);

            List<String> advertisementImageKeys = adsAssoc.stream()
                    .map(adsA -> adsA.getAdvertisement().getImageKey())
                    .collect(Collectors.toList());

            // Add the advertisement image
            reportAndAds.put("advertisementImage", advertisementImageKeys);

            // Add the combined map to the result
            result.add(reportAndAds);
        }

        try{
            ObjectMapper objectMapper = new ObjectMapper();
            String resultJson = objectMapper.writeValueAsString(result);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(resultJson);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @DeleteMapping ("/delete")
    @Transactional
    public  ResponseEntity<?> deleteReport(@RequestParam String token, @RequestParam Long teamId, @RequestParam long reportId, @RequestParam String reportType) {
        //Check if the token is available
        if(!jwtUtils.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }

        Long requesterId = jwtUtils.getUserId(token);
        List<Team> userTeams = userAccountManagementService.getTeamMemberByID(requesterId).get(0).getTeams();

        boolean isAuthorized = false;
        for(Team team : userTeams){
            if(Objects.equals(team.getTeamId(), teamId)) {
                isAuthorized = true;
                break;
            }
        }

        if(!isAuthorized) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized request");
        }

        // Delete the report based on the report type
        switch (reportType) {
            case "MultipleAdAnalysisReport":
                try {
                    List <MultipleAdAnalysisReport> report = multipleAdService.getByReportId(reportId);
                    List<AdvertisementReportAssociation> associations = associationService.getByReport(report.get(0));
                    for(AdvertisementReportAssociation association : associations) {
                        associationService.deleteAdvertisementReportAssociationByAssociationId(association.getId());
                        TextualAdvertisement ad = advertisementService.getByAdvertisementId(association.getAdvertisement().getAdvertisementId()).get(0);
                        advertisementService.deleteAdvertisementById(ad.getAdvertisementId());
                    }

                    multipleAdService.deleteReportByReportId(reportId);
                    break;
                }catch(Exception e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
                }
            case "SingleAdAnalysisReport":
                try{
                    List <SingleAdAnalysisReport> report = singleAdService.getByReportId(reportId);

                    TextualAdvertisement ad = report.get(0).getAdvertisement();
                    singleAdService.deleteReportByReportId(reportId);
                    advertisementService.deleteAdvertisementById(ad.getAdvertisementId());
                    break;
                }catch(Exception e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
                }
            case "ImageAdAnalysisReport":
                try{
                    List <ImageAdAnalysisReport> report = imageAdAnalysisReportService.getByReportId(reportId);

                    ImageAdvertisement ad = report.get(0).getAdvertisement();
                    imageAdAnalysisReportService.deleteReportByReportId(reportId);
                    imageAdvertisementService.deleteAdvertisementById(ad.getAdvertisementId());
                    break;
                }catch(Exception e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
                }
            case "MultipleImageAdAnalysisReport":
                try{
                    List <MultipleImageAdAnalysisReport> report = multipleImageAdAnalysisReportService.getByReportId(reportId);
                    List<ImageAdvertisementReportAssociation> associations = imageAssociationService.getByReport(report.get(0));
                    for(ImageAdvertisementReportAssociation association : associations) {
                        imageAssociationService.deleteAdvertisementReportAssociationByAssociationId(association.getId());
                        ImageAdvertisement ad = imageAdvertisementService.getByAdvertisementId(association.getAdvertisement().getAdvertisementId()).get(0);
                        imageAdvertisementService.deleteAdvertisementById(ad.getAdvertisementId());
                    }

                    multipleImageAdAnalysisReportService.deleteReportByReportId(reportId);
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
