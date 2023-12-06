package com.advantage.advantage.repositories;

import com.advantage.advantage.models.CompanyAdministrator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface CompanyAdministratorRepo extends JpaRepository<CompanyAdministrator, Long>
{
    public List<CompanyAdministrator> findById(long id);
    public CompanyAdministrator deleteById(long id);
    public List<CompanyAdministrator> findByName(String name);
}
