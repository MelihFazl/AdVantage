package com.advantage.advantage.repositories;

import com.advantage.advantage.models.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface TeamRepo extends JpaRepository<Team, Long>
{
    public List<Team> findByTeamId(long id);
    public Long deleteByTeamId(long id);
    public List<Team> findByTeamName(String teamName);

    // Find all teams belonging to a specific company
    List<Team> findByCompanyAdministrator_Company_CompanyId(long companyId);
}

