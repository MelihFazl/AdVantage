package com.advantage.advantage.controllers;

import com.advantage.advantage.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.advantage.advantage.services.*;
import com.advantage.advantage.repositories.*;
import com.advantage.advantage.helpers.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

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


    /*
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
    */



    @GetMapping("/teamMember")
    public List<TeamMember> getTeamMember(@RequestParam long userID)
    {
        return userAccountManagementService.getTeamMemberByID(userID);
    }

    @GetMapping("/teamMember/getAll")
    public List<TeamMember> getAllTeamMembers()
    {
        return userAccountManagementService.getAllTeamMembers();
    }

    @GetMapping("/companyAdministrator")
    public List<CompanyAdministrator> getCompanyAdministrator(@RequestParam long companyAdministratorId)
    {
        return userAccountManagementService.getCompanyAdministratorByID(companyAdministratorId);
    }

    @GetMapping("/companyAdministrator/getAll")
    public ResponseEntity<?> getAllCompanyAdministrators() {
        try {
            List<CompanyAdministrator> administrators = userAccountManagementService.getAllCompanyAdministrator();

            if (administrators.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No company administrators found.");
            }

            return ResponseEntity.ok(administrators);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while fetching company administrators.");
        }
    }


    @GetMapping("/employee/getAll")
    public List<Employee> getAllEmployees()
    {
        return userAccountManagementService.getAllEmployee();
    }


    @PostMapping("/teamMember/login/{id}")
    public String loginTeamMemberById(@RequestParam String password, @PathVariable("id") long userID) {
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

    @PostMapping("/teamMember/login")
    public String loginTeamMemberByEmail(@RequestBody Map<String, String> loginRequest) {

        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        passwordHashHandler = PasswordHashHandler.getInstance();
        passwordHashHandler.setPassword(password);

        List<TeamMember> teamMembers = userAccountManagementService.getTeamMemberByEmail(email);
        if (teamMembers == null)
            return "No team member was found with email " + email;
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
    public String loginCompanyAdministratorById(@RequestParam String password, @PathVariable("id") long companyAdministratorId) {
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

    @PostMapping("/companyAdministrator/login")
    public String loginCompanyAdministratorByEmail(@RequestBody Map<String, String> loginRequest) {

        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        passwordHashHandler = PasswordHashHandler.getInstance();
        passwordHashHandler.setPassword(password);

        List<CompanyAdministrator> companyAdministrators = userAccountManagementService.getCompanyAdministratorByEmail(email);
        if (companyAdministrators == null)
            return "No company administrator was found with email " + email;
        else {
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
            return "Team Member with ID " + userID + " successfully logged out";
        }
    }

    @PostMapping("/logout")
    public String logOutByEmail(@RequestParam String email) {
        List<TeamMember> teamMembers = userAccountManagementService.getTeamMemberByEmail(email);
        if (teamMembers == null) {
            List<CompanyAdministrator> companyAdministrators = userAccountManagementService.getCompanyAdministratorByEmail(email);
            if (companyAdministrators == null)
                return "No user found with email " + email;
            else {
                CompanyAdministrator curCompanyAdministrator = companyAdministrators.get(0);
                curCompanyAdministrator.getToken().setLastActive(LocalDateTime.now());
                curCompanyAdministrator.getToken().setInUse(false);
                tokenRepository.save(curCompanyAdministrator.getToken());
                userAccountManagementService.saveCompanyAdministrator(curCompanyAdministrator);

                return "CompanyAdministrator with email " + email + " successfully logged out";
            }
        } else {
            TeamMember curTeamMember = teamMembers.get(0);
            curTeamMember.getToken().setLastActive(LocalDateTime.now());
            curTeamMember.getToken().setInUse(false);
            tokenRepository.save(curTeamMember.getToken());
            userAccountManagementService.saveTeamMember(curTeamMember);
            return "Team Member with email " + email + " successfully logged out";
        }
    }

}
