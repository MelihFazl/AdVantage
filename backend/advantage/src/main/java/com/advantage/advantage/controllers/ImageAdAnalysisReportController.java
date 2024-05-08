package com.advantage.advantage.controllers;

import com.advantage.advantage.helpers.ImageModelAPIResponse;
import com.advantage.advantage.helpers.ImageModelDTO;
import com.advantage.advantage.helpers.JwtUtils;
import com.advantage.advantage.models.*;
import com.advantage.advantage.s3_exceptions.FileEmptyException;
import com.advantage.advantage.s3_exceptions.FileUploadException;
import com.advantage.advantage.services.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/imageanalysisreport")
@CrossOrigin
public class ImageAdAnalysisReportController {
    @Autowired
    ImageAdAnalysisReportService imageAdAnalysisReportService;

    @Autowired
    MultipleImageAdAnalysisReportService multipleImageAdAnalysisReportService;

    @Autowired
    MultipleImgAdAnalysisReportAssociationService multipleImgAdAnalysisReportAssociationService;

    @Autowired

    ImageAdvertisementService imageAdService;

    @Autowired
    ModelService modelService;

    @Autowired
    TeamService teamService;

    @Autowired
    FileService fileService;

    private final UserAccountManagementService userAccountManagementService;
    private final JwtUtils jwtUtils;

    public ImageAdAnalysisReportController(UserAccountManagementService userAccountManagementService) {
        this.userAccountManagementService = userAccountManagementService;
        this.jwtUtils = new JwtUtils(userAccountManagementService);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createSingleAnalysisReport(@RequestParam String token, @RequestParam String title, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date createdAt,
                                                             @RequestParam AdCategory category, @RequestParam("file") MultipartFile multipartFile, @RequestParam Long teamId, @RequestParam float spend)  throws FileEmptyException, FileUploadException, IOException {

        if(!jwtUtils.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }

        long uploaderId = jwtUtils.getUserId(token);
        List<Team> userTeams = userAccountManagementService.getTeamMemberByID(uploaderId).get(0).getTeams();

        boolean isAuthorized = false;
        Team userTeam = null;
        for(Team team : userTeams){
            if(Objects.equals(team.getTeamId(), teamId)) {
                userTeam = team;
                isAuthorized = true;
                break;
            }
        }

        if(!isAuthorized) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized request");
        }

        if (title.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please enter a valid title");

        }
        if((userTeam.getUsageLimit() - userTeam.getMonthlyAnalysisUsage()) <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You do not have enough usage limit");
        }

        if (createdAt == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("There is not a valid date");
        }
        if (category == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please specify an advertisement category");
        }
        if (multipartFile.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty. Cannot save an empty file");
        }
        boolean isValidFile = isValidFile(multipartFile);
        List<String> allowedFileExtensions = new ArrayList<>(Arrays.asList("png", "jpg", "jpeg"));

        if (!isValidFile || !allowedFileExtensions.contains(FilenameUtils.getExtension(multipartFile.getOriginalFilename()))) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File does not have the allowed extensions");
        }
        String fileName = fileService.uploadFile(multipartFile);
        ImageAdvertisement createdAdvertisement = imageAdService.saveAdvertisement(category, uploaderId, createdAt, fileName, teamId);


        if (createdAdvertisement== null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("There is an error saving the advertisement");
        }

        //float prediction = modelService.calculateCPI(adText);
        //List<Long> shapleyVal = modelService.calculateShapVal(adText);
        ImageModelAPIResponse response = modelService.getImagePrediction(multipartFile);
        float prediction = modelService.calculateImageCPI(response);
        if(prediction != 0) {
            prediction = (1 / prediction) * spend;
        }
        Map<Integer, Float> ageDist = modelService.calculateImageAgeDistribution(response);
        Map<String, Float> genderDist =  modelService.calculateImageGenderDistribution(response);
        float genderM = genderDist.get("Male");
        float genderF = genderDist.get("Female");
        float age1317 = ageDist.get(0);
        float age1824 = ageDist.get(1);
        float age2534 = ageDist.get(2);
        float age3544 = ageDist.get(3);
        float age4554 = ageDist.get(4);
        float age5564 = ageDist.get(5);
        float age65 = ageDist.get(6);

        if (imageAdAnalysisReportService.saveAdAnalysisReport(title, uploaderId, createdAt, prediction, createdAdvertisement, teamId,
            genderM, genderF, age1317, age1824, age2534, age3544, age4554, age5564, age65) != null) {
            userTeam.setMonthlyAnalysisUsage(userTeam.getMonthlyAnalysisUsage() + 1);
            teamService.updateTeam(userTeam);

            return ResponseEntity.status(HttpStatus.OK).body("Advertisement and report saved successfully!");
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("There is an error creating the report");
    }

    @PostMapping("/createMultiple")
    public ResponseEntity<String> createMultipleAnalysisReport(@RequestParam String token,
                                                               @RequestParam String title,
                                                               @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date createdAt,
                                                               @RequestParam AdCategory category,
                                                               @RequestParam("files") MultipartFile[] files,
                                                               @RequestParam Long teamId, @RequestParam float spend) throws FileEmptyException, FileUploadException, IOException {

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

        if (createdAt == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("There is not a valid date");
        }

        if (title.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please enter a title");
        }

        if (category == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please specify a category");
        }


        if (files.length > (userTeam.getUsageLimit() - userTeam.getMonthlyAnalysisUsage())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You do not have enough usage limit");
        }

        // Loop through each file and process it
        List<ImageModelDTO> analyzedAdvertisements = new ArrayList<>();
        String comparisons = "";
        try{
            for (MultipartFile file : files) {

                if (file.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty. Cannot save an empty file");
                }

                boolean isValidFile = isValidFile(file);
                List<String> allowedFileExtensions = new ArrayList<>(Arrays.asList("png", "jpg", "jpeg"));

                if (!isValidFile || !allowedFileExtensions.contains(FilenameUtils.getExtension(file.getOriginalFilename()))) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File does not have the allowed extensions");
                }

                ImageModelAPIResponse response = modelService.getImagePrediction(file);
                float prediction = modelService.calculateImageCPI(response);
                if(prediction != 0) {
                    prediction = (1 / prediction) * spend;
                }
                Map<Integer, Float> ageDist = modelService.calculateImageAgeDistribution(response);
                Map<String, Float> genderDist =  modelService.calculateImageGenderDistribution(response);
                float genderM = genderDist.get("Male");
                float genderF = genderDist.get("Female");
                float age1317 = ageDist.get(0);
                float age1824 = ageDist.get(1);
                float age2534 = ageDist.get(2);
                float age3544 = ageDist.get(3);
                float age4554 = ageDist.get(4);
                float age5564 = ageDist.get(5);
                float age65 = ageDist.get(6);

                ImageModelDTO ad = new ImageModelDTO(prediction, genderM, genderF, age1317, age1824, age2534, age3544, age4554, age5564, age65);
                analyzedAdvertisements.add(ad);
            }

        }catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            comparisons = objectMapper.writeValueAsString(analyzedAdvertisements);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }


        MultipleImageAdAnalysisReport newReport = multipleImageAdAnalysisReportService.saveAdAnalysisReport(title, createdAt, uploaderId, comparisons.trim(), teamId);

        // Save analysis report
        if (newReport != null) {
            userTeam.setMonthlyAnalysisUsage(userTeam.getMonthlyAnalysisUsage() + files.length);
            teamService.updateTeam(userTeam);

            for (MultipartFile file : files) {
                String fileName = fileService.uploadFile(file);
                ImageAdvertisement createdAdvertisement = imageAdService.saveAdvertisement(category, uploaderId, createdAt, fileName, teamId);
                ImageAdvertisementReportAssociation newAssociation = multipleImgAdAnalysisReportAssociationService.saveAdvertisementReportAssociation(createdAdvertisement, newReport,  0);

                if (newAssociation == null) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("There is an error creating the association");
                }
            }

            return ResponseEntity.status(HttpStatus.OK).body("Advertisements and report saved successfully!");
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("There is an error creating the report");
    }



    @GetMapping("/allreports")
    public List<ImageAdAnalysisReport> getAllReports()
    {
        return imageAdAnalysisReportService.getAllReports();
    }

    @GetMapping("/userreports")
    public ResponseEntity<?> getReportsByUploaderId(@RequestParam String token)
    {
        if(!jwtUtils.validateToken(token)) {
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
        List<ImageAdAnalysisReport> reports = imageAdAnalysisReportService.getByUploaderId(userID);

        return ResponseEntity.ok(reports);
    }
    private boolean isValidFile(MultipartFile multipartFile){
        if (Objects.isNull(multipartFile.getOriginalFilename())){
            return false;
        }
        return !multipartFile.getOriginalFilename().trim().equals("");
    }

}
