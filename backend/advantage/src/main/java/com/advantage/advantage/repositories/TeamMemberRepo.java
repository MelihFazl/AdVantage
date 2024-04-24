package com.advantage.advantage.repositories;

import com.advantage.advantage.models.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface TeamMemberRepo extends JpaRepository<TeamMember, Long>
{
    public List<TeamMember> findById(long id);

    @Query("SELECT tm.name, tm.surname, tm.email, tm.teams FROM TeamMember tm JOIN tm.teams t WHERE t.teamId = :teamId")
    List<Object[]> findByTeamId(@Param("teamId") Long teamId);

    @Query("SELECT tm.email, tm.id, tm.monthlyAnalysisUsage, tm.name, tm.surname FROM TeamMember tm WHERE tm.id = :id")
    public TeamMember secureFindByUserId(@Param("id") long id);

    public List<TeamMember> findByEmail(String email);

    @Query("SELECT tm FROM TeamMember tm JOIN tm.teams t WHERE t.teamId = :teamId")
    List<TeamMember> findAllByTeamId(@Param("teamId") Long teamId);

    public TeamMember deleteById(long id);
    public List<TeamMember> findByName(String name);
}
