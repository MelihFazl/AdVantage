package com.advantage.advantage.controllers;


import com.advantage.advantage.models.CompanyAdministrator;
import com.advantage.advantage.models.Team;
import com.advantage.advantage.repositories.TokenRepository;
import com.advantage.advantage.services.TeamService;
import com.advantage.advantage.services.UserAccountManagementService;
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

    @Autowired
    public TeamController(
            UserAccountManagementService userAccountManagementService,
            TeamService teamService,
            TokenRepository tokenRepository) {
        this.userAccountManagementService = userAccountManagementService;
        this.teamService = teamService;
        this.tokenRepository = tokenRepository;
    }

    /**
     * Only an authorized company administrator can create a team
     * @param token authentication token
     * @param team information to create
     * @return ResponseEntity with the result of the request
     */
    @PostMapping("/addTeam")
    public ResponseEntity<String> saveTeam(@RequestParam String token, @RequestBody Team team) {
        List<CompanyAdministrator> companyAdministrators = userAccountManagementService.getAllCompanyAdministrator();
        if (companyAdministrators != null && !companyAdministrators.isEmpty()) {
            boolean tokenMatch = false;
            for (CompanyAdministrator companyAdministrator : companyAdministrators) {
                if (companyAdministrator.getToken() != null) {
                    if (companyAdministrator.getToken().getToken().equals(token) && companyAdministrator.getToken().getInUse()) {
                        tokenMatch = true;
                        team.setCompanyAdministrator(companyAdministrator);
                        break;
                    }
                }
            }
            if (tokenMatch) {
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
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Unauthorized request.");
    }
}
