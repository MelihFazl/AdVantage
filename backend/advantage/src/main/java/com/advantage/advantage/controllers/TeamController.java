package com.advantage.advantage.controllers;


import com.advantage.advantage.helpers.JwtUtils;
import com.advantage.advantage.models.CompanyAdministrator;
import com.advantage.advantage.models.Team;
import com.advantage.advantage.repositories.TokenRepository;
import com.advantage.advantage.services.TeamService;
import com.advantage.advantage.services.UserAccountManagementService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/team")
@CrossOrigin
public class TeamController {
    private final UserAccountManagementService userAccountManagementService;

    private final TeamService teamService;
    private final TokenRepository tokenRepository;

    private final JwtUtils jwtUtils;

    @Autowired
    public TeamController(
            UserAccountManagementService userAccountManagementService,
            TeamService teamService,
            TokenRepository tokenRepository) {
        this.userAccountManagementService = userAccountManagementService;
        this.teamService = teamService;
        this.tokenRepository = tokenRepository;
        this.jwtUtils = new JwtUtils(userAccountManagementService);
    }

    /**
     * Only an authorized company administrator can create a team
     * @param token authentication token
     * @param team information to create
     * @return ResponseEntity with the result of the request
     */
    @PostMapping("/addTeam")
    public ResponseEntity<String> saveTeam(@RequestParam String token, @RequestBody Team team) {

        boolean tokenMatch = jwtUtils.validateToken(token, "CA");
        if (tokenMatch) {
            Long userId = jwtUtils.getUserId(token);
            CompanyAdministrator ca = userAccountManagementService.getCompanyAdministratorByID(userId).get(0);
            team.setCompanyAdministrator(ca);

            if (teamService.saveTeam(team) != null) {
                return ResponseEntity.status(HttpStatus.CREATED)
                        .body("Team with name (" + team.getTeamName() + ") and with id (" + team.getTeamId() + ") has been created.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("There is already an existing team with the id" + team.getTeamId());
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized request.");
        }

    }

    @DeleteMapping("/removeTeam")
    @Transactional
    public ResponseEntity<String> deleteTeam(@RequestParam String token, @RequestParam long teamId) {

        boolean tokenMatch = jwtUtils.validateToken(token, "CA");

        if (tokenMatch) {

            Team team = teamService.getTeamById(teamId).get(0);
            if (team != null) {

                Long userId = jwtUtils.getUserId(token);
                CompanyAdministrator ca = userAccountManagementService.getCompanyAdministratorByID(userId).get(0);
                if(team.getCompanyAdministrator() == null || team.getCompanyAdministrator().getId() != userId) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body("Unauthorized request.");
                }

                try {
                    teamService.deleteTeamById(teamId);
                    return ResponseEntity.status(HttpStatus.OK)
                            .body("Team with name (" + team.getTeamName() + ") and with id (" + team.getTeamId() + ") has been deleted.");
                } catch (Error e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(e.getMessage());
                }
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("There is not a team with the id" + teamId);
            }

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized request.");

        }
    }

    @PostMapping("/getAllTeams")
    public ResponseEntity<String> getAllTeams(@RequestParam String token) {
        boolean tokenMatch = jwtUtils.validateToken(token, "CA");
        if (tokenMatch) {
            Long userId = jwtUtils.getUserId(token);
            Long companyId = userAccountManagementService.getCompanyAdministratorByID(userId).get(0).getCompany().getCompanyId();

            try{
                List<Team> teams = teamService.getAllTeamsBelongToCompany(companyId);
                ObjectMapper objectMapper = new ObjectMapper();
                String teamsJson = objectMapper.writeValueAsString(teams);
                return ResponseEntity.status(HttpStatus.OK)
                        .body(teamsJson);

            }catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(e.getMessage());
            }

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized request.");
        }
    }

    @PostMapping("/getTeam")
    public ResponseEntity<String> getTeam(@RequestParam String token, @RequestParam Long teamId) {

        boolean tokenMatch = jwtUtils.validateToken(token, "CA");
        if (tokenMatch) {
            Long userId = jwtUtils.getUserId(token);
            long caId = userAccountManagementService.getCompanyAdministratorByID(userId).get(0).getId();

            try{
                List<Team> teams = teamService.getTeamById(teamId);

                if(teams.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body("The Team doesn't exist");
                }

                if( teams.get(0).getCompanyAdministrator().getId() != caId) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body("Unauthorized request.");
                }

                ObjectMapper objectMapper = new ObjectMapper();
                String teamsJson = objectMapper.writeValueAsString(teams);
                return ResponseEntity.status(HttpStatus.OK)
                        .body(teamsJson);

            }catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(e.getMessage());
            }

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized request.");
        }
    }

    @PostMapping("/updateTeam")
    public ResponseEntity<String> updateTeam(@RequestParam String token, @RequestParam Long teamId, @RequestBody Team updatedTeam) {

        boolean tokenMatch = jwtUtils.validateToken(token, "CA");
        if (tokenMatch) {
            Long userId = jwtUtils.getUserId(token);
            long caId = userAccountManagementService.getCompanyAdministratorByID(userId).get(0).getId();

            try{
                List<Team> teams = teamService.getTeamById(teamId);

                if(teams.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body("The Team doesn't exist");
                }

                if( teams.get(0).getCompanyAdministrator().getId() != caId) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body("Unauthorized request.");
                }

                teamService.patchTeam(updatedTeam, teamId);

                return ResponseEntity.status(HttpStatus.OK)
                        .body("Team with the id " + teamId + " is successfully updated");

            }catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(e.getMessage());
            }

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized request.");
        }
    }

}
