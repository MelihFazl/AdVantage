package com.advantage.advantage.services;

import com.advantage.advantage.models.Team;
import com.advantage.advantage.repositories.TeamRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamServiceImplementation implements  TeamService {

    private final TeamRepo teamRepository;

    @Autowired
    public TeamServiceImplementation(TeamRepo teamRepository) {
        this.teamRepository = teamRepository;
    }

    @Override
    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    @Override
    public List<Team> getAllTeamsBelongToCompany(long companyId) {
        return teamRepository.findByCompanyAdministrator_Company_CompanyId(companyId);
    }

    @Override
    public List<Team> getTeamById(long teamId) {
        return teamRepository.findByTeamId(teamId);
    }

    @Override
    public List<Team> getTeamByTeamName(String teamName) {
        return teamRepository.findByTeamName(teamName);
    }

    @Override
    public Team saveTeam(Team team) {
        List<Team> teams = teamRepository.findByTeamId(team.getTeamId());
        if(teams == null || teams.isEmpty()) {
            return teamRepository.save(team);
        }
        return null;
    }

    @Override
    public Team updateTeam(Team team) {
        return teamRepository.save(team);
    }

    @Override
    public Team deleteTeamById(long teamId) {
        return teamRepository.deleteByTeamId(teamId);
    }
}
