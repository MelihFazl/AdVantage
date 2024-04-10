package com.advantage.advantage.controllers;

import com.advantage.advantage.helpers.JwtUtils;
import com.advantage.advantage.models.AdCategory;
import com.advantage.advantage.models.ImageAdvertisement;
import com.advantage.advantage.models.Team;
import com.advantage.advantage.models.TextualAdvertisement;
import com.advantage.advantage.s3_exceptions.FileEmptyException;
import com.advantage.advantage.s3_exceptions.FileUploadException;
import com.advantage.advantage.services.FileService;
import com.advantage.advantage.services.ImageAdvertisementService;
import com.advantage.advantage.services.UserAccountManagementService;
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
@RequestMapping("/imageAdvertisement")
@CrossOrigin
public class ImageAdvertisementController {
    @Autowired
    ImageAdvertisementService imageAdService;
    @Autowired
    FileService fileService;

    private final UserAccountManagementService userAccountManagementService;
    private final JwtUtils jwtUtils;
    public ImageAdvertisementController(FileService fileService,UserAccountManagementService userAccountManagementService,ImageAdvertisementService imageAdService) {
        this.userAccountManagementService = userAccountManagementService;
        this.jwtUtils = new JwtUtils(userAccountManagementService);
        this.fileService = fileService;
        this.imageAdService = imageAdService;
    }
    @PostMapping("/create")
    public ResponseEntity<?> createImageAdvertisement(
            @RequestParam String token,
            @RequestParam AdCategory category,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date uploadedAt,
            @RequestParam("file") MultipartFile multipartFile,
            @RequestParam Long teamId)  throws FileEmptyException, FileUploadException, IOException {
        if (!jwtUtils.validateToken(token)) {
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
        if (multipartFile.isEmpty()){
            throw new FileEmptyException("File is empty. Cannot save an empty file");
        }
        boolean isValidFile = isValidFile(multipartFile);
        List<String> allowedFileExtensions = new ArrayList<>(Arrays.asList("png", "jpg", "jpeg"));

        if (isValidFile && allowedFileExtensions.contains(FilenameUtils.getExtension(multipartFile.getOriginalFilename()))) {
            String fileName = fileService.uploadFile(multipartFile);
            ImageAdvertisement createdAdvertisement = imageAdService.saveAdvertisement(category, uploaderId, uploadedAt, fileName, teamId);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdAdvertisement);
        }

        APIResponse apiResponse = APIResponse.builder()
                .message("Invalid File. File extension or File name is not supported")
                .isSuccessful(false)
                .statusCode(400)
                .build();
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);

    }
    private boolean isValidFile(MultipartFile multipartFile){
        if (Objects.isNull(multipartFile.getOriginalFilename())){
            return false;
        }
        return !multipartFile.getOriginalFilename().trim().equals("");
    }

}
