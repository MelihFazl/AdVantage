package com.advantage.advantage.controllers;
import com.advantage.advantage.helpers.JwtUtils;
import com.advantage.advantage.helpers.TextModelAPIResponse;
import com.advantage.advantage.models.*;
import com.advantage.advantage.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Objects;


@RestController
@RequestMapping("/singleanalysisreport")
@CrossOrigin
public class SingleAnalysisReportController {
    @Autowired
    SingleAnalysisAdReportService repService;
    @Autowired

    TextualAdvertisementService textAdService;

    @Autowired
    TeamService teamService;

    @Autowired
    ModelService modelService;

    private final UserAccountManagementService userAccountManagementService;
    private final JwtUtils jwtUtils;

    public SingleAnalysisReportController(UserAccountManagementService userAccountManagementService) {
        this.userAccountManagementService = userAccountManagementService;
        this.jwtUtils = new JwtUtils(userAccountManagementService);
    }


    @PostMapping("/create")
    public ResponseEntity<String> createSingleAnalysisReport(@RequestParam String token, @RequestParam String title, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date createdAt,
                                                             @RequestParam AdCategory category, @RequestParam String adText,  @RequestParam float spend,  @RequestParam String tone, @RequestParam Long teamId) {

        if (!jwtUtils.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }

        long uploaderId = jwtUtils.getUserId(token);
        List<Team> userTeams = userAccountManagementService.getTeamMemberByID(uploaderId).get(0).getTeams();

        boolean isAuthorized = false;
        Team userTeam = null;
        for (Team team : userTeams) {
            if (Objects.equals(team.getTeamId(), teamId)) {
                userTeam = team;
                isAuthorized = true;
                break;
            }
        }

        if (!isAuthorized) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized request");
        }

        if (title.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please enter a valid title");
        }

        if (createdAt == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("There is not a valid date");
        }

        if (adText.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please enter a valid advertisement text");
        }

        if (category == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please specify an advertisement category");
        }
        if ((userTeam.getUsageLimit() - userTeam.getMonthlyAnalysisUsage()) <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You do not have enough usage limit");
        }
        TextualAdvertisement newAd = textAdService.saveAdvertisement(category, uploaderId, createdAt, adText, teamId);

        if (newAd == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("There is an error saving the advertisement");
        }

        SingleAdAnalysisReport newReport = new SingleAdAnalysisReport();
        TextModelAPIResponse response = modelService.getTextualPrediction(adText, spend, tone);
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

        if (repService.saveAdAnalysisReport(title, uploaderId, createdAt, prediction, textRecommendation, spend, tone,  genderM, genderF, age1317, age1824, age2534,age3544,age4554,age5564,age65, newAd, teamId) != null) {
            userTeam.setMonthlyAnalysisUsage(userTeam.getMonthlyAnalysisUsage() + 1);
            teamService.updateTeam(userTeam);

            return ResponseEntity.status(HttpStatus.OK).body("Advertisement and report saved successfully!");
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("There is an error creating the report");
    }

    @GetMapping("/allreports")
    public List<SingleAdAnalysisReport> getAllReports() {
        return repService.getAllReports();
    }

    @GetMapping("/userreports")
    public ResponseEntity<? extends Object> getReportsById(@RequestParam String token) {
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
            List<SingleAdAnalysisReport> reports = repService.getByUploaderId(userID);

            return ResponseEntity.ok(reports);
        }
    }
}
