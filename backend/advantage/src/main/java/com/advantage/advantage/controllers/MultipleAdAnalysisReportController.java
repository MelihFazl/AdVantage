package com.advantage.advantage.controllers;

import com.advantage.advantage.helpers.AdRequestsWrapper;
import com.advantage.advantage.helpers.JwtUtils;
import com.advantage.advantage.models.*;
import com.advantage.advantage.repositories.MultipleAdAnalysisReportAssociationRepo;
import com.advantage.advantage.services.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.List;
import java.util.Objects;

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

    private final UserAccountManagementService userAccountManagementService;
    private final JwtUtils jwtUtils;

    public MultipleAdAnalysisReportController(UserAccountManagementService userAccountManagementService) {
        this.userAccountManagementService = userAccountManagementService;
        this.jwtUtils = new JwtUtils(userAccountManagementService);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createMultipleAnalysisReport(@RequestParam String token, @RequestParam String title, @RequestParam AdCategory category, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date createdAt,
                                                               @RequestBody AdRequestsWrapper adRequestsWrapper, @RequestParam Long teamId) {

        if(!jwtUtils.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }

        long uploaderId = jwtUtils.getUserId(token);
        List<Team> userTeams = userAccountManagementService.getTeamMemberByID(uploaderId).get(0).getTeams();

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


        List<String> adRequests = adRequestsWrapper.getAdRequests();

        if (createdAt == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("There is not a valid date");
        }

        if (title.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please enter a title");
        }

        if (category == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please specify a category");
        }

        String comparisons = "";
        for (String adRequest : adRequests) {
            float comparison = (float) (Math.random() * 0.9999);
            comparisons += String.format("%.4f ", comparison);
        }

        MultipleAdAnalysisReport newReport = repService.saveAdAnalysisReport(title, createdAt, uploaderId,comparisons.trim(), teamId);

        if (newReport == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("There is an error creating the report");
        }

        for (String adRequest : adRequests) {
            TextualAdvertisement newTextAd = textAdService.saveAdvertisement(category, uploaderId, createdAt, adRequest, teamId);
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



