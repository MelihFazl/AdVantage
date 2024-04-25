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
    public List<Employee> getEmployeeByName(String name);

    public List<TeamMember> getTeamMemberByID(long teamMemberID);

    public TeamMember secureGetTeamMemberByID(long teamMemberID);

    public List<TeamMember> getTeamMemberByEmail(String email);

    public List<Object[]> getTeamMembersByTeamId(long teamId);

    public List<TeamMember> getAllTeamMembersByTeamId(long teamId);

    public List<Object[]> getAllTeamMembersByCompany(long companyAdminId);

    public List<CompanyAdministrator> getCompanyAdministratorByID(long companyAdministratorID);

    public List<CompanyAdministrator> secureGetCompanyAdministratorByID(long companyAdministratorID);

    public List<CompanyAdministrator> getCompanyAdministratorByEmail(String email);

    public List<CompanyAdministrator> getCompanyAdministratorByCompanyId(long companyID);


    public TeamMember saveTeamMember(TeamMember teamMember);
    public CompanyAdministrator saveCompanyAdministrator(CompanyAdministrator companyAdministrator);

    public TeamMember updateTeamMember(TeamMember teamMember);
    public CompanyAdministrator updateCompanyAdministrator(CompanyAdministrator companyAdministrator);

    public TeamMember patchTeamMember(TeamMember editedTeamMember, long teamMemberId);
    public CompanyAdministrator patchCompanyAdministrator(CompanyAdministrator editedCompanyAdministrator, long companyAdministratorId);

    public TeamMember deleteTeamMemberByID(long teamMemberId);
    public CompanyAdministrator deleteCompanyAdministratorByID(long companyAdministratorId);
}
