package com.advantage.advantage.repositories;

import com.advantage.advantage.models.CompanyAdministrator;
import com.advantage.advantage.models.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface CompanyAdministratorRepo extends JpaRepository<CompanyAdministrator, Long>
{
    public List<CompanyAdministrator> findById(long id);

    @Query("SELECT ca.email, ca.id, ca.name, ca.surname FROM CompanyAdministrator ca WHERE ca.id = :id")
    public List<CompanyAdministrator> secureFindByUserId(@Param("id") long id);

    public List<CompanyAdministrator> findByEmail(String email);

    public CompanyAdministrator deleteById(long id);
    public List<CompanyAdministrator> findByName(String name);
    public List<CompanyAdministrator> findByCompany_CompanyId(long companyId);
}
