package com.advantage.advantage.services;

import com.advantage.advantage.models.CompanyAdministrator;
import com.advantage.advantage.models.Employee;
import com.advantage.advantage.models.TeamMember;

import java.util.List;

public interface UserAccountManagementService {

    public List<Employee> getAllEmployee();
    public List<TeamMember> getAllTeamMembers();
    public List<CompanyAdministrator> getAllCompanyAdministrator();
    public List<Employee> getEmployeeByID(long employeeID);
    public List<TeamMember> getTeamMemberByID(long teamMemberID);
    public List<CompanyAdministrator> getCompanyAdministratorByID(long gymStaffID);

    public TeamMember saveTeamMember(TeamMember gymMember);
    public CompanyAdministrator saveCompanyAdministrator(CompanyAdministrator companyAdministrator);

}
