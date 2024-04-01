package com.advantage.advantage.services;

import com.advantage.advantage.models.Team;
import com.advantage.advantage.models.TeamMember;
import com.advantage.advantage.models.CompanyAdministrator;
import com.advantage.advantage.models.Company;

import java.util.List;

public interface TeamService {

    public List<Team> getAllTeams();
    public List<Team> getAllTeamsBelongToCompany(long companyId);
    public List<Team> getTeamById(long teamId);

    public List<Team> getTeamByTeamName(String teamName);


    public Team saveTeam(Team team);
    public Team updateTeam(Team team);

    public Team patchTeam(Team editedTeam, long teamId);

    public Long deleteTeamById(long teamId);


}
