package com.advantage.advantage.controllers;

import com.advantage.advantage.helpers.AdRequestsWrapper;
import com.advantage.advantage.helpers.JwtUtils;
import com.advantage.advantage.helpers.TextModelAPIResponse;
import com.advantage.advantage.helpers.TextModelDTO;
import com.advantage.advantage.models.*;
import com.advantage.advantage.repositories.MultipleAdAnalysisReportAssociationRepo;
import com.advantage.advantage.services.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
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
    TeamService teamService;

    @Autowired
    ModelService modelService;

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
                                                               @RequestBody AdRequestsWrapper adRequestsWrapper, @RequestParam float spend,  @RequestParam String tone, @RequestParam Long teamId) {

        if (!jwtUtils.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }

        long uploaderId = jwtUtils.getUserId(token);
        List<Team> userTeams = userAccountManagementService.getTeamMemberByID(uploaderId).get(0).getTeams();
        Team userTeam = null;

        boolean isAuthorized = false;
        for (Team team : userTeams) {
            if (Objects.equals(team.getTeamId(), teamId)) {
                isAuthorized = true;
                userTeam = team;
                break;
            }
        }

        if (!isAuthorized) {
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
        List<TextModelDTO> multipleAdvertisementResults = new ArrayList<>();
        Integer usages = 0;
        for (String adRequest : adRequests) {
            usages++;
        }

        if (usages > (userTeam.getUsageLimit() - userTeam.getMonthlyAnalysisUsage())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You do not have enough usage limit");
        }

        for (String adRequest : adRequests) {
            TextModelAPIResponse response = modelService.getTextualPrediction(adRequest, spend, tone);
            float prediction = modelService.calculateCPI(response);
            List <Float> ageDistribution = modelService.calculateAgeDistribution(response);
            List <Float> genderDistribution = modelService.calculateGenderDistribution(response);
            String textRecommendation = modelService.calculateTextRecommendation(response);
            float genderM = genderDistribution.get(0);
            float genderF = genderDistribution.get(1);
            float age1317 = ageDistribution.get(0);
            float age1824 = ageDistribution.get(1);
            float age2534 = ageDistribution.get(2);
            float age3544 = ageDistribution.get(3);
            float age4554 = ageDistribution.get(4);
            float age5564 = ageDistribution.get(5);
            float age65 = ageDistribution.get(6);

            TextModelDTO advertisementResult = new TextModelDTO(prediction, ageDistribution, genderDistribution,
                    textRecommendation, genderM, genderF, age1317, age1824, age2534, age3544, age4554, age5564, age65);

            multipleAdvertisementResults.add(advertisementResult);
        }

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            comparisons = objectMapper.writeValueAsString(multipleAdvertisementResults);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }


        MultipleAdAnalysisReport newReport = repService.saveAdAnalysisReport(title, createdAt, uploaderId, comparisons.trim(), teamId);

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

        userTeam.setMonthlyAnalysisUsage(userTeam.getMonthlyAnalysisUsage() + usages);
        teamService.updateTeam(userTeam);

        return ResponseEntity.status(HttpStatus.OK).body("Success");
    }

    @GetMapping("/allreports")
    public List<MultipleAdAnalysisReport> getAllReports() {
        return repService.getAllReports();
    }

    @GetMapping("/userreports")
    public ResponseEntity<?> getReportsByUploaderId(@RequestParam String token) {
        {
            if (!jwtUtils.validateToken(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
            }

            Long userID = jwtUtils.getUserId(token);
            List<Team> userTeams = userAccountManagementService.getTeamMemberByID(userID).get(0).getTeams();
 /*
        boolean isAuthorized = false;
        for(Team team : userTeams){
            if(Objects.equals(team.getTeamId(), teamId)) {
                isAuthorized = true;
                break;
            }
        }



        if(!isAuthorized) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized request");
        } */
            List<MultipleAdAnalysisReport> reports = repService.getByUploaderId(userID);

            return ResponseEntity.ok(reports);
        }
    }
}



