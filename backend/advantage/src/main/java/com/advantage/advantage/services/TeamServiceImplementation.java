package com.advantage.advantage.services;

import com.advantage.advantage.helpers.IgnoredPropertyCreator;
import com.advantage.advantage.models.Team;
import com.advantage.advantage.models.TeamMember;
import com.advantage.advantage.repositories.TeamRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamServiceImplementation implements  TeamService {

    private final TeamRepo teamRepository;
    private IgnoredPropertyCreator ignoredPropertyCreator;

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
        return teamRepository.save(team);
    }

    @Override
    public Team updateTeam(Team team) {
        return teamRepository.save(team);
    }

    @Override
    public Team patchTeam(Team editedTeam, long teamId) {
        List<Team> teams = teamRepository.findByTeamId(teamId);
        if(teams == null || teams.isEmpty())
        {
            return null;
        }
        else
        {
            Team oldTeam = teams.get(0);
            ignoredPropertyCreator = IgnoredPropertyCreator.getInstance();
            ignoredPropertyCreator.setObj(editedTeam);
            String[] ignoredProperties = ignoredPropertyCreator.getNullPropertyNames();
            BeanUtils.copyProperties(editedTeam, oldTeam, ignoredProperties);
            teamRepository.save(oldTeam);
            return oldTeam;
        }
    }

    @Override
    public Long deleteTeamById(long teamId) {
        return teamRepository.deleteByTeamId(teamId);
    }
}
