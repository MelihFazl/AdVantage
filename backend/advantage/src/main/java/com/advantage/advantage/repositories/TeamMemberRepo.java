package com.advantage.advantage.repositories;

import com.advantage.advantage.models.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface TeamMemberRepo extends JpaRepository<TeamMember, Long>
{
    public List<TeamMember> findById(long id);
    public TeamMember deleteById(long id);
    public List<TeamMember> findByName(String name);
}
