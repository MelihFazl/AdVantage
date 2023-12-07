package com.advantage.advantage.repositories;

import com.advantage.advantage.models.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface CompanyRepo extends JpaRepository<Company, Long>
{
    public List<Company> findByCompanyId(long id);
    public Company deleteByCompanyId(long id);
    public List<Company> findByCompanyName(String companyName);
}
