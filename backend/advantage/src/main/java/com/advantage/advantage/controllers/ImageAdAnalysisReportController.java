package com.advantage.advantage.controllers;

import com.advantage.advantage.helpers.JwtUtils;
import com.advantage.advantage.models.*;
import com.advantage.advantage.s3_exceptions.FileEmptyException;
import com.advantage.advantage.s3_exceptions.FileUploadException;
import com.advantage.advantage.services.*;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/imageanalysisreport")
@CrossOrigin
public class ImageAdAnalysisReportController {
    @Autowired
    ImageAdAnalysisReportService imageAdAnalysisReportService;
    @Autowired

    ImageAdvertisementService imageAdService;

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
                                                             @RequestParam AdCategory category, @RequestParam("file") MultipartFile multipartFile, @RequestParam Long teamId)  throws FileEmptyException, FileUploadException, IOException {

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
        float prediction = 0.5f;



        if (imageAdAnalysisReportService.saveAdAnalysisReport(title, uploaderId, createdAt, prediction, createdAdvertisement, teamId) != null) {
            userTeam.setMonthlyAnalysisUsage(userTeam.getMonthlyAnalysisUsage() + 1);
            teamService.updateTeam(userTeam);

            return ResponseEntity.status(HttpStatus.OK).body("Advertisement and report saved successfully!");
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("There is an error creating the report");
    }

    @GetMapping("/allreports")
    public List<ImageAdAnalysisReport> getAllReports()
    {
        return imageAdAnalysisReportService.getAllReports();
    }

    @GetMapping("/userreports")
    public List<ImageAdAnalysisReport> getReportsById(@RequestParam long uploaderId)
    {
        return imageAdAnalysisReportService.getByUploaderId(uploaderId);
    }
    private boolean isValidFile(MultipartFile multipartFile){
        if (Objects.isNull(multipartFile.getOriginalFilename())){
            return false;
        }
        return !multipartFile.getOriginalFilename().trim().equals("");
    }

}
