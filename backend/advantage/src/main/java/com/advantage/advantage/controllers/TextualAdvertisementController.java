package com.advantage.advantage.controllers;
import com.advantage.advantage.models.AdCategory;
import com.advantage.advantage.models.TextualAdvertisement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.advantage.advantage.services.*;
import com.advantage.advantage.repositories.*;
import com.advantage.advantage.helpers.*;


import java.util.Date;

@RestController
@RequestMapping("/advertisement")
@CrossOrigin
public class TextualAdvertisementController {
    @Autowired
    TextualAdvertisementService textAdService;

    private final UserAccountManagementService userAccountManagementService;
    private final JwtUtils jwtUtils;

    public TextualAdvertisementController(UserAccountManagementService userAccountManagementService) {
        this.userAccountManagementService = userAccountManagementService;
        this.jwtUtils = new JwtUtils(userAccountManagementService);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTextAdvertisement(
            @RequestParam String token,
            @RequestParam AdCategory category,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date uploadedAt,
            @RequestParam String adText) {
        if (!jwtUtils.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }

        long uploaderId = jwtUtils.getUserId(token);
        TextualAdvertisement createdAdvertisement = textAdService.saveAdvertisement(category, uploaderId, uploadedAt, adText);

        // Adjust the status code and add any additional headers if needed
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAdvertisement);
    }
}
