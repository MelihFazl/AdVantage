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
import java.util.*;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserAccountManagementController {

    private final UserAccountManagementService userAccountManagementService;
    private final CompanyService companyService;
    private final EmailService emailService;

    private  final TeamService teamService;

    private final TokenRepository tokenRepository;
    private final CompanySubscriptionService subscriptionService ;
    private final JwtUtils jwtUtils;


    @Autowired
    public UserAccountManagementController(
            UserAccountManagementService userAccountManagementService,
            CompanyService companyService,
            CompanySubscriptionService subscriptionService,
            TokenRepository tokenRepository,
            EmailService emailService, TeamService teamService) {
        this.userAccountManagementService = userAccountManagementService;
        this.companyService = companyService;
        this.tokenRepository = tokenRepository;
        this.subscriptionService = subscriptionService;
        this.emailService = emailService;
        this.teamService = teamService;
        this.jwtUtils = new JwtUtils(userAccountManagementService);
    }

    private PasswordHashHandler passwordHashHandler = PasswordHashHandler.getInstance();


    /**
     * Only an authorized company administrator can create a team member
     * @param token authentication token
     * @param teamMember team member information to create
     * @return ResponseEntity with the result of the request
     */
    @PostMapping("/teamMember/add/test")
    public ResponseEntity<String> saveTeamMember_test(@RequestParam String token, @RequestBody TeamMember teamMember) {
        boolean tokenMatch = jwtUtils.validateToken(token, "CA");

        if (tokenMatch) {
            Long userId = jwtUtils.getUserId(token);
            CompanyAdministrator ca = userAccountManagementService.getCompanyAdministratorByID(userId).get(0);
            passwordHashHandler.setPassword(teamMember.getHashedPassword());
            teamMember.setHashedPassword(passwordHashHandler.hashPassword());
            teamMember.setCompanyAdministrator(ca);
            if (userAccountManagementService.saveTeamMember(teamMember) != null) {
                Company comp = teamMember.getCompanyAdministrator().getCompany();
                comp.setNumberOfEmployees(comp.getNumberOfEmployees() + 1);
                companyService.saveCompany(comp);
                return ResponseEntity.status(HttpStatus.CREATED)
                        .body("Team Member with name (" + teamMember.getName() + ") and with id (" + teamMember.getId() + ") has been created.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("There is already an existing team member with the id" + teamMember.getId());
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized requesttttt.");
        }
    }

    @PostMapping("/teamMember/add")
    public ResponseEntity<String> saveTeamMember(@RequestParam String token, @RequestBody TeamMember teamMember) {
        boolean tokenMatch = jwtUtils.validateToken(token, "CA");

        if (tokenMatch) {
            Long userId = jwtUtils.getUserId(token);
            CompanyAdministrator ca = userAccountManagementService.getCompanyAdministratorByID(userId).get(0);
            String randomPassword = RandomPasswordGenerator.generatePassword(12);
            passwordHashHandler.setPassword(randomPassword);
            teamMember.setHashedPassword(passwordHashHandler.hashPassword());
            teamMember.setCompanyAdministrator(ca);
            if (userAccountManagementService.saveTeamMember(teamMember) != null) {
                Company comp = teamMember.getCompanyAdministrator().getCompany();
                comp.setNumberOfEmployees(comp.getNumberOfEmployees() + 1);
                companyService.saveCompany(comp);
                String subject = "Your personal password for adVantage";
                String text = "Welcome to advantage! \n This is your password to login to your personal account: "
                        + randomPassword + " \n Feel free to change your password later";
                emailService.sendSimpleMessage(teamMember.getEmail(), subject, text);
                return ResponseEntity.status(HttpStatus.CREATED)
                        .body("Team Member with name (" + teamMember.getName() + ") and with id (" + teamMember.getId() + ") has been created.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("There is already an existing team member with the id" + teamMember.getId());
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized requesttttt.");
        }
    }

    @PostMapping("/teamMember/update")
    public ResponseEntity<String> updateTeamMember(@RequestParam String token, @RequestParam Long teamMemberId, @RequestBody TeamMember updatedTeamMember) {
        boolean tokenMatch = jwtUtils.validateToken(token, "CA");

        if (tokenMatch) {
            Long userId = jwtUtils.getUserId(token);
            CompanyAdministrator ca = userAccountManagementService.getCompanyAdministratorByID(userId).get(0);

            try{
                userAccountManagementService.patchTeamMember(updatedTeamMember, teamMemberId);
                return ResponseEntity.status(HttpStatus.CREATED)
                        .body("Team Member with id " + (teamMemberId) + " has been successfully updated.");
            }catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(e.getMessage());
            }

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized requesttttt.");
        }
    }

    @PostMapping("/teamMember/removeTeam")
    public ResponseEntity<String> removeTeam(@RequestParam String token, @RequestParam Long teamMemberId, @RequestParam Long teamId) {
        boolean tokenMatch = jwtUtils.validateToken(token, "CA");

        if (tokenMatch) {
            Long userId = jwtUtils.getUserId(token);
            CompanyAdministrator ca = userAccountManagementService.getCompanyAdministratorByID(userId).get(0);

            try{
                TeamMember tm = userAccountManagementService.getTeamMemberByID(teamMemberId).get(0);

                if(tm == null) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body("Team member with id " + teamId + " does not exist");
                }

                if(tm.getCompanyAdministrator().getId() != userId) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body("Unauthorized requesttttt.");
                }

                List<Team> userTeams = tm.getTeams();

                // Iterate over the userTeams list
                Iterator<Team> iterator = userTeams.iterator();
                while (iterator.hasNext()) {
                    Team team = iterator.next();
                    if (team.getTeamId().equals(teamId)) {
                        iterator.remove(); // Remove the team with the specified teamIdToRemove
                    }
                }
                tm.setTeams(userTeams);

                userAccountManagementService.patchTeamMember(tm, teamMemberId);
                return ResponseEntity.status(HttpStatus.CREATED)
                        .body("Team Member with id " + (teamMemberId) + " has been successfully removed from team with the id " + teamId + ".");
            }catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(e.getMessage());
            }

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized requesttttt.");
        }
    }

    @PostMapping("/teamMember/assignTeam")
    public ResponseEntity<String> assignTeam(@RequestParam String token, @RequestParam Long teamMemberId, @RequestParam Long teamId) {
        boolean tokenMatch = jwtUtils.validateToken(token, "CA");

        if (tokenMatch) {
            Long userId = jwtUtils.getUserId(token);
            CompanyAdministrator ca = userAccountManagementService.getCompanyAdministratorByID(userId).get(0);

            try{
                TeamMember tm = userAccountManagementService.getTeamMemberByID(teamMemberId).get(0);
                Team assignedTeam = teamService.getTeamById(teamId).get(0);

                if(assignedTeam == null) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body("Team with id " + teamId + " does not exist");
                }

                if(tm == null) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body("Team member with id " + teamMemberId + " does not exist");
                }

                if(tm.getCompanyAdministrator().getId() != userId) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body("Unauthorized requesttttt.");
                }

                List<Team> userTeams = tm.getTeams();
                userTeams.add(assignedTeam);
                tm.setTeams(userTeams);

                userAccountManagementService.patchTeamMember(tm, teamMemberId);
                return ResponseEntity.status(HttpStatus.CREATED)
                        .body("Team Member with id " + (teamMemberId) + " has been successfully assigned to team with the id " + teamId + ".");
            }catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(e.getMessage());
            }

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized requesttttt.");
        }
    }

    @PostMapping("/updatePassword")
    public ResponseEntity<String> updatePassword(@RequestParam String token, @RequestParam String newPassword) {
        boolean tokenMatch = jwtUtils.validateToken(token);

        if (tokenMatch) {
            passwordHashHandler.setPassword(newPassword);
            String hashedPassword = passwordHashHandler.hashPassword();

            if(Objects.equals(jwtUtils.getUserType(token), "CA")) {
                try {
                    CompanyAdministrator ca = userAccountManagementService.getCompanyAdministratorByID(jwtUtils.getUserId(token)).get(0);
                    ca.setHashedPassword(hashedPassword);
                    userAccountManagementService.updateCompanyAdministrator(ca);
                }catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(e.getMessage());
                }
            } else if(Objects.equals(jwtUtils.getUserType(token), "TM")) {
                try {
                    TeamMember tm = userAccountManagementService.getTeamMemberByID(jwtUtils.getUserId(token)).get(0);
                    tm.setHashedPassword(hashedPassword);
                    userAccountManagementService.updateTeamMember(tm);
                }catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(e.getMessage());
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Unauthorized requesttttt.");
            }


            return ResponseEntity.status(HttpStatus.OK)
                    .body("Password of user with the id " + jwtUtils.getUserId(token) + " has been successfully updated");


        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized requesttttt.");
        }
    }

    @PostMapping("/forgetPassword")
    public ResponseEntity<String> forgetPassword(@RequestParam String email) {
        List<CompanyAdministrator> companyAdministrators = userAccountManagementService.getCompanyAdministratorByEmail(email);

        if (companyAdministrators == null || companyAdministrators.isEmpty()) {
            List<TeamMember> teamMembers = userAccountManagementService.getTeamMemberByEmail(email);
            if (teamMembers == null || teamMembers.isEmpty()) {
                return new ResponseEntity<>("No user was found with email " + email, HttpStatus.NOT_FOUND);
            }else{
                TeamMember teamMemberLoggingIn = teamMembers.get(0);
                Token token = new Token();
                token.setInUse(true);
                String tokenStr = token.generateToken(teamMemberLoggingIn.getId(), "TM");
                tokenRepository.save(token);
                teamMemberLoggingIn.setToken(token);
                userAccountManagementService.updateTeamMember(teamMemberLoggingIn);
                String subject = "Your Forget Password request";
                String text = "Hello " +  teamMemberLoggingIn.getName() + ", \nWe received a request to reset the password " +
                        "associated with your account. To proceed with resetting your password, please click the link below: http://localhost:3000/reset-password" +  "?token="
                        + tokenStr + " \nIf you didn't initiate this request or believe it was sent to you in error, please ignore this email. " +
                        "Your password will remain unchanged."  + "\nFor security reasons, this link will expire in 15 minutes. " +
                        "If you don't reset your password within this time frame, you'll need to request a new link."
                        + "\nThank you \nAdvantage Team";
                emailService.sendSimpleMessage(teamMemberLoggingIn.getEmail(), subject, text);

                return new ResponseEntity<>("Your change password link is sent to your email", HttpStatus.OK);
            }
        } else {
            CompanyAdministrator companyAdministratorLoggingIn = companyAdministrators.get(0);
            if (passwordHashHandler.hashPassword().equals(companyAdministratorLoggingIn.getHashedPassword())) {
                Token token = new Token();
                token.setInUse(true);
                String tokenStr = token.generateToken(companyAdministratorLoggingIn.getId(), "CA");
                tokenRepository.save(token);
                companyAdministratorLoggingIn.setToken(token);
                userAccountManagementService.updateCompanyAdministrator(companyAdministratorLoggingIn);
                String subject = "Your Forget Password request";
                String text = "Hello " +  companyAdministratorLoggingIn.getName() + ", \nWe received a request to reset the password " +
                        "associated with your account. To proceed with resetting your password, please click the link below: \n {url}?token="
                        + tokenStr + " \nIf you didn't initiate this request or believe it was sent to you in error, please ignore this email. " +
                        "Your password will remain unchanged."  + "\nFor security reasons, this link will expire in 15 minutes. " +
                        "If you don't reset your password within this time frame, you'll need to request a new link."
                        + "\nThank you \nAdvantage Team";
                emailService.sendSimpleMessage(companyAdministratorLoggingIn.getEmail(), subject, text);

                return new ResponseEntity<>("Your change password link is sent to your email", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Login credentials are incorrect", HttpStatus.UNAUTHORIZED);
            }
        }
    }

    @DeleteMapping("/teamMember/delete")
    public ResponseEntity<String> deleteTeamMember(@RequestParam String token, @RequestParam int teamMemberId) {
        boolean tokenMatch = jwtUtils.validateToken(token, "CA");
        if (tokenMatch) {
            TeamMember teamMember = userAccountManagementService.getTeamMemberByID(teamMemberId).get(0);
            if (teamMember == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("There isn't a team member with the id " + teamMemberId);
            }

            Long userId = jwtUtils.getUserId(token);
            CompanyAdministrator ca = userAccountManagementService.getCompanyAdministratorByID(userId).get(0);

            if(teamMember.getCompanyAdministrator() == null || teamMember.getCompanyAdministrator().getId() != userId) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Unauthorized request.");
            }

            try {
                userAccountManagementService.deleteTeamMemberByID(teamMemberId);
                Company comp = teamMember.getCompanyAdministrator().getCompany();
                comp.setNumberOfEmployees(comp.getNumberOfEmployees() - 1);
                companyService.saveCompany(comp);
                return ResponseEntity.status(HttpStatus.OK)
                        .body("Team Member with name (" + teamMember.getName() + ") and with id (" + teamMember.getId() + ") has been deleted.");
            }catch(Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(e.getMessage());
            }

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized request.");
        }
    }


    /**
     * Endpoint to add a new Company Administrator along with a new Company
     * @param companyAdministrator The Company Administrator information
     * @param companyName The name of the Company
     * @return ResponseEntity with the result of the request
     */
    @PostMapping("/companyAdministrator/add")
    public ResponseEntity<String> saveCompanyAdministrator(@RequestBody CompanyAdministrator companyAdministrator, @RequestParam String companyName) {
        // Create a new Company instance
        Company company = new Company();
        company.setCompanyName(companyName);
        company.setNumberOfEmployees(1);
        CompanySubscription newSubscription;
        Date cd = new Date();

        newSubscription = subscriptionService.saveSubscription(PaymentPlanType.Free, PaymentPeriodType.Monthly, cd);
        company.setSubscription(newSubscription);
        company.setAvailableLimit(newSubscription.getUsageLimit());

        // Set the CompanyAdministrator for the Company
        companyAdministrator.setCompany(company);

        //hash password
        passwordHashHandler.setPassword(companyAdministrator.getHashedPassword());
        companyAdministrator.setHashedPassword(passwordHashHandler.hashPassword());

        // Save both entities
        companyService.saveCompany(company);
        if(userAccountManagementService.saveCompanyAdministrator(companyAdministrator) != null) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Company with name (" + companyName + ") \n Company Administrator with name (" + companyAdministrator.getName() + ") and with id (" + companyAdministrator.getId() + ") has been created.");
        }else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("There is already an existing companyAdministrator with the id" + companyAdministrator.getId());
        }

    }

    @GetMapping("/teamMember")
    public List<TeamMember>  getTeamMember(@RequestParam long userID)
    {
        return userAccountManagementService.getTeamMemberByID(userID);
    }

    @GetMapping("/teamMember/getAll")
    public List<TeamMember> getAllTeamMembers()
    {
        return userAccountManagementService.getAllTeamMembers();
    }

    @PostMapping("/teamMember/getAllByTeamId")
    public ResponseEntity<List<Object[]>> getAllTeamMembersByTeamId(@RequestParam String token, @RequestParam long teamId) {
        boolean tokenMatch = jwtUtils.validateToken(token, "CA");
        if (tokenMatch) {
            Long userId = jwtUtils.getUserId(token);
            Team team = teamService.getTeamById(teamId).get(0);

            if (team == null || team.getCompanyAdministrator().getId() != userId) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }

            List<Object[]> teamMembers = userAccountManagementService.getTeamMembersByTeamId(teamId);
            if (teamMembers.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            return ResponseEntity.ok(teamMembers);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @PostMapping("/teamMember/getAllByCompany")
    public ResponseEntity<List<Object[]>> getAllTeamMembersByCompany(@RequestParam String token) {
        boolean tokenMatch = jwtUtils.validateToken(token, "CA");
        if (tokenMatch) {
            Long userId = jwtUtils.getUserId(token);

            List<Object[]> teamMembers = userAccountManagementService.getAllTeamMembersByCompany(userId);
            if (teamMembers == null || teamMembers.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            return ResponseEntity.ok(teamMembers);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
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

        @PostMapping("/teamMember/login")
        public ResponseEntity<String> loginTeamMemberByEmail(@RequestBody Map<String, String> loginRequest) {
            String email = loginRequest.get("email");
            String password = loginRequest.get("password");

            passwordHashHandler = PasswordHashHandler.getInstance();
            passwordHashHandler.setPassword(password);

            List<TeamMember> teamMembers = userAccountManagementService.getTeamMemberByEmail(email);

            if (teamMembers == null || teamMembers.isEmpty()) {
                return new ResponseEntity<>("No team member was found with email " + email, HttpStatus.NOT_FOUND);
            } else {
                TeamMember teamMemberLoggingIn = teamMembers.get(0);
                if (passwordHashHandler.hashPassword().equals(teamMemberLoggingIn.getHashedPassword())) {
                    Token token = new Token();
                    token.setInUse(true);
                    /*
                    token.setLastActive(LocalDateTime.now());
                     */
                    String tokenStr = token.generateToken(teamMemberLoggingIn.getId(), "TM");
                    tokenRepository.save(token);
                    teamMemberLoggingIn.setToken(token);
                    userAccountManagementService.updateTeamMember(teamMemberLoggingIn);

                    // Include userID in the response string
                    //String responseString = "UserID: " + teamMemberLoggingIn.getId() + " Token: TM " + tokenStr ;
                    String responseString = "UserID: " + teamMemberLoggingIn.getId() + " Token: TM " + tokenStr ;


                    return new ResponseEntity<>(tokenStr, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("Login credentials are incorrect", HttpStatus.UNAUTHORIZED);
                }
            }
        }
        @PostMapping("/companyAdministrator/login")
        public ResponseEntity<String> loginCompanyAdministratorByEmail(@RequestBody Map<String, String> loginRequest) {

            String email = loginRequest.get("email");
            String password = loginRequest.get("password");

            passwordHashHandler = PasswordHashHandler.getInstance();
            passwordHashHandler.setPassword(password);

            List<CompanyAdministrator> companyAdministrators = userAccountManagementService.getCompanyAdministratorByEmail(email);

            if (companyAdministrators == null || companyAdministrators.isEmpty()) {
                return new ResponseEntity<>("No company administrator was found with email " + email, HttpStatus.NOT_FOUND);
            } else {
                CompanyAdministrator companyAdministratorLoggingIn = companyAdministrators.get(0);
                if (passwordHashHandler.hashPassword().equals(companyAdministratorLoggingIn.getHashedPassword())) {
                    Token token = new Token();
                    token.setInUse(true);
                    /*
                    token.setLastActive(LocalDateTime.now());
                     */
                    String tokenStr = token.generateToken(companyAdministratorLoggingIn.getId(), "CA");
                    tokenRepository.save(token);
                    companyAdministratorLoggingIn.setToken(token);
                    userAccountManagementService.updateCompanyAdministrator(companyAdministratorLoggingIn);

                    // Include companyAdministratorId in the response string
                    //String responseString = "CompanyAdministratorID: " + companyAdministratorLoggingIn.getId() + " Token: CA " + tokenStr;

                    return new ResponseEntity<>(tokenStr, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("Login credentials are incorrect", HttpStatus.UNAUTHORIZED);
                }
            }
        }

    @PostMapping("/login")
    public ResponseEntity<String> loginByEmail(@RequestBody Map<String, String> loginRequest) {

        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        passwordHashHandler = PasswordHashHandler.getInstance();
        passwordHashHandler.setPassword(password);

        List<CompanyAdministrator> companyAdministrators = userAccountManagementService.getCompanyAdministratorByEmail(email);

        if (companyAdministrators == null || companyAdministrators.isEmpty()) {
            List<TeamMember> teamMembers = userAccountManagementService.getTeamMemberByEmail(email);
            if (teamMembers == null || teamMembers.isEmpty()) {
                return new ResponseEntity<>("No user was found with email " + email, HttpStatus.NOT_FOUND);
            }else{
                TeamMember teamMemberLoggingIn = teamMembers.get(0);
                if (passwordHashHandler.hashPassword().equals(teamMemberLoggingIn.getHashedPassword())) {
                    Token token = new Token();
                    token.setInUse(true);
                    String tokenStr = token.generateToken(teamMemberLoggingIn.getId(), "TM");
                    tokenRepository.save(token);
                    teamMemberLoggingIn.setToken(token);
                    userAccountManagementService.updateTeamMember(teamMemberLoggingIn);
                    return new ResponseEntity<>(tokenStr, HttpStatus.OK);
                }else {
                    return new ResponseEntity<>("Login credentials are incorrect", HttpStatus.UNAUTHORIZED);
                }
            }
        } else {
            CompanyAdministrator companyAdministratorLoggingIn = companyAdministrators.get(0);
            if (passwordHashHandler.hashPassword().equals(companyAdministratorLoggingIn.getHashedPassword())) {
                Token token = new Token();
                token.setInUse(true);
                String tokenStr = token.generateToken(companyAdministratorLoggingIn.getId(), "CA");
                tokenRepository.save(token);
                companyAdministratorLoggingIn.setToken(token);
                userAccountManagementService.updateCompanyAdministrator(companyAdministratorLoggingIn);
                return new ResponseEntity<>(tokenStr, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Login credentials are incorrect", HttpStatus.UNAUTHORIZED);
            }
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logOut(@RequestParam String token) {

        try {
            Long userID = jwtUtils.getUserId(token);
            String userType = jwtUtils.getUserType(token);

            if(userType.equals("TM")) {
                List<TeamMember> teamMembers = userAccountManagementService.getTeamMemberByID(userID);

                if(teamMembers == null ||teamMembers.isEmpty()) {
                    return new ResponseEntity<>("No team member was found with id " + userID, HttpStatus.NOT_FOUND);
                }

                TeamMember curTeamMember = teamMembers.get(0);
            /*
            curTeamMember.getToken().setLastActive(LocalDateTime.now());
            */
                curTeamMember.getToken().setInUse(false);
                tokenRepository.save(curTeamMember.getToken());
                userAccountManagementService.saveTeamMember(curTeamMember);

                // Successfully logged out for Team Member
                return new ResponseEntity<>("Team Member with ID " + userID + " successfully logged out", HttpStatus.OK);
            } else if(userType.equals("CA")) {
                List<CompanyAdministrator> companyAdministrators = userAccountManagementService.getCompanyAdministratorByID(userID);

                if(companyAdministrators == null || companyAdministrators.isEmpty()) {
                    return new ResponseEntity<>("No Company Administrator was found with id " + userID, HttpStatus.NOT_FOUND);
                }

                CompanyAdministrator curCompanyAdministrator = companyAdministrators.get(0);
                /*
                curCompanyAdministrator.getToken().setLastActive(LocalDateTime.now());
                 */
                curCompanyAdministrator.getToken().setInUse(false);

                tokenRepository.save(curCompanyAdministrator.getToken());
                userAccountManagementService.saveCompanyAdministrator(curCompanyAdministrator);

                // Successfully logged out for CompanyAdministrator
                return new ResponseEntity<>("CompanyAdministrator with ID " + userID + " successfully logged out", HttpStatus.OK);
            } else {
                throw new Exception("Invalid token");
            }

        }catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);

        }
    }



}
