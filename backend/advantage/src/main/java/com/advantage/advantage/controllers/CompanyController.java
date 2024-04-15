package com.advantage.advantage.controllers;

import com.advantage.advantage.helpers.JwtUtils;
import com.advantage.advantage.models.*;
import com.advantage.advantage.services.CompanyService;
import com.advantage.advantage.services.CompanySubscriptionService;
import com.advantage.advantage.services.UserAccountManagementService;
import jdk.jshell.JShell;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/company")
@CrossOrigin
public class CompanyController {
    private final JwtUtils jwtUtils;
    private final UserAccountManagementService userAccountManagementService;

    private final CompanySubscriptionService subscriptionService;


    private final CompanyService companyService;


    public CompanyController(CompanySubscriptionService subscriptionService,CompanyService companyService, UserAccountManagementService userAccountManagementService){
        this.jwtUtils = new JwtUtils(userAccountManagementService);
        this.userAccountManagementService = userAccountManagementService;
        this.companyService = companyService;
        this.subscriptionService = subscriptionService;
    }
    @GetMapping("/get")
    public ResponseEntity<?> getCompany(@RequestParam String token){
        if(!jwtUtils.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }

        Long userID = jwtUtils.getUserId(token);
        String userType = jwtUtils.getUserType(token);
        switch (userType){
            case "CA":
                Company company = userAccountManagementService.getCompanyAdministratorByID(userID).get(0).getCompany();
                return ResponseEntity.ok(company);
            case  "TM":
                Company company2 = userAccountManagementService.getTeamMemberByID(userID).get(0).getCompanyAdministrator().getCompany();
                return ResponseEntity.ok(company2);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("There is no company with this token");
    }

    @PostMapping("/updateSubscription")
    public ResponseEntity<?> updateSubscription(@RequestParam String token, @RequestParam PaymentPlanType paymentPlanType, @RequestParam PaymentPeriodType paymentPeriodType, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date createdAt ){
        if(!jwtUtils.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }

        Long userID = jwtUtils.getUserId(token);
        String userType = jwtUtils.getUserType(token);
        switch (userType){
            case "CA":
                CompanyAdministrator admin = userAccountManagementService.getCompanyAdministratorByID(userID).get(0);
                CompanySubscription oldSubscription = admin.getCompany().getSubscription();

                CompanySubscription savedSubscription = subscriptionService.updateCompanySubscription(paymentPlanType,paymentPeriodType,createdAt, oldSubscription.getSubscriptionId());
                if( savedSubscription != null){
                    APIResponse apiResponse = APIResponse.builder().message("Subscription is updated")
                            .statusCode(200).build();
                    return new ResponseEntity<>(apiResponse, HttpStatus.OK);
                }
                case  "TM":
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Team Member is not authorized for this process");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This process is not successfully completed");
    }

}
