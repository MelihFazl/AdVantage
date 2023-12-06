package com.advantage.advantage.repositories;

import com.advantage.advantage.models.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface TeamRepo extends JpaRepository<Team, Long>
{
    public List<Team> findByTeamId(long id);
    public Team deleteByTeamId(long id);
    public List<Team> findByTeamName(String teamName);
}

