package com.advantage.advantage.controllers;

import com.advantage.advantage.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.advantage.advantage.services.*;
import com.advantage.advantage.repositories.*;
import com.advantage.advantage.helpers.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserAccountManagementController {

    private final UserAccountManagementService userAccountManagementService;
    private final CompanyService companyService;
    private final TokenRepository tokenRepository;

    @Autowired
    public UserAccountManagementController(
            UserAccountManagementService userAccountManagementService,
            CompanyService companyService,
            TokenRepository tokenRepository) {
        this.userAccountManagementService = userAccountManagementService;
        this.companyService = companyService;
        this.tokenRepository = tokenRepository;
    }

    private PasswordHashHandler passwordHashHandler = PasswordHashHandler.getInstance();

    /**
     * Only an authorized company administrator can create a team member
     * @param token
     * @param teamMember
     * @return
     */
    @PostMapping("/teamMember/add")
    public String saveTeamMember(@RequestParam String token, @RequestBody TeamMember teamMember)
    {
        List<CompanyAdministrator> companyAdministrators = userAccountManagementService.getAllCompanyAdministrator();
        if (companyAdministrators != null) {
            boolean tokenMatch = false;
            for (int i = 0; companyAdministrators.size() > i; i++) {
                if (companyAdministrators.get(i).getToken() != null) {
                    if (companyAdministrators.get(i).getToken().getToken().equals(token) && companyAdministrators.get(i).getToken().getInUse()) {
                        tokenMatch = true;
                        break;
                    }
                }
            }
            if (tokenMatch) {
                passwordHashHandler.setPassword(teamMember.getHashedPassword());
                teamMember.setHashedPassword(passwordHashHandler.hashPassword());
                if (userAccountManagementService.saveTeamMember(teamMember) != null)
                    return "Team Member with name (" + teamMember.getName() + ") and with id (" + teamMember.getId() + ") has been created.";
                else
                    return "There is already an existing team member with the id" + teamMember.getId();
            } else {
                return "Unauthorized request.";
            }
        }
        return "Unauthorized request.";
    }

    @PostMapping("/companyAdministrator/add")
    public String saveCompanyAdministrator(@RequestBody CompanyAdministrator companyAdministrator)
    {
        // Create a new Company instance
        Company company = new Company();
        company.setCompanyName("Default Company Name"); // Set other properties as needed
        company.setNumberOfEmployees(1);

        // Set the CompanyAdministrator for the Company
        companyAdministrator.setCompany(company);

        // Set the Company for the CompanyAdministrator
        company.setCompanyAdministrator(companyAdministrator);

        // Save both entities
        companyService.saveCompany(company);

        // The CompanyAdministrator will be saved automatically due to the cascading relationship
        // To update the company information call the necessary route from company controller

        return "Company Administrator and Company saved successfully";
    }

    @PostMapping("/teamMember/login/{id}")
    public String loginTeamMember(@RequestParam String password, @PathVariable("id") long userID) {
        passwordHashHandler = PasswordHashHandler.getInstance();
        passwordHashHandler.setPassword(password);
        List<TeamMember> teamMembers = userAccountManagementService.getTeamMemberByID(userID);
        if (teamMembers == null)
            return "No team member was found with ID " + userID;
        else {
            TeamMember teamMemberLoggingIn = teamMembers.get(0);
            if (passwordHashHandler.hashPassword().equals(teamMemberLoggingIn.getHashedPassword())) {
                Token token = new Token();
                token.setInUse(true);
                token.setLastActive(LocalDateTime.now());
                String tokenStr = token.generateToken();
                tokenRepository.save(token);
                teamMemberLoggingIn.setToken(token);
                userAccountManagementService.updateTeamMember(teamMemberLoggingIn);
                return "TM " + tokenStr;
            }
            return "Login credentials are incorrect";
        }
    }

    @PostMapping("/companyAdministrator/login/{id}")
    public String loginCompanyAdministrator(@RequestParam String password, @PathVariable("id") long companyAdministratorId) {
        passwordHashHandler = PasswordHashHandler.getInstance();
        passwordHashHandler.setPassword(password);
        List<CompanyAdministrator> companyAdministrators = userAccountManagementService.getCompanyAdministratorByID(companyAdministratorId);
        if (companyAdministrators == null)
            return "No Company Administrator was found with ID " + companyAdministratorId;
        CompanyAdministrator companyAdministratorLoggingIn = companyAdministrators.get(0);
        if (passwordHashHandler.hashPassword().equals(companyAdministratorLoggingIn.getHashedPassword())) {
            Token token = new Token();
            token.setInUse(true);
            token.setLastActive(LocalDateTime.now());
            String tokenStr = token.generateToken();
            tokenRepository.save(token);
            companyAdministratorLoggingIn.setToken(token);
            userAccountManagementService.updateCompanyAdministrator(companyAdministratorLoggingIn);
            return "CA " + tokenStr;
        }
        return "Login credentials are incorrect";
    }


    @PostMapping("/logout/{id}")
    public String logOut(@PathVariable("id") long userID) {
        List<TeamMember> teamMembers = userAccountManagementService.getTeamMemberByID(userID);
        if (teamMembers == null) {
            List<CompanyAdministrator> companyAdministrators = userAccountManagementService.getCompanyAdministratorByID(userID);
            if (companyAdministrators == null)
                return "No user found with ID " + userID;
            else {
                CompanyAdministrator curCompanyAdministrator = companyAdministrators.get(0);
                curCompanyAdministrator.getToken().setLastActive(LocalDateTime.now());
                curCompanyAdministrator.getToken().setInUse(false);
                tokenRepository.save(curCompanyAdministrator.getToken());
                userAccountManagementService.saveCompanyAdministrator(curCompanyAdministrator);

                return "CompanyAdministrator with ID " + userID + " successfully logged out";
            }
        } else {
            TeamMember curTeamMember = teamMembers.get(0);
            curTeamMember.getToken().setLastActive(LocalDateTime.now());
            curTeamMember.getToken().setInUse(false);
            tokenRepository.save(curTeamMember.getToken());
            userAccountManagementService.saveTeamMember(curTeamMember);
            return "GymStaff with ID " + userID + " successfully logged out";
        }
    }



}
