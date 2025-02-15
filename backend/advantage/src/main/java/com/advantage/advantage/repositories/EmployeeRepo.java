package com.advantage.advantage.repositories;

import com.advantage.advantage.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface EmployeeRepo extends JpaRepository<Employee, Long>
{
    //employee is currently a super class not en entity, hence no database for the employee repo
}
