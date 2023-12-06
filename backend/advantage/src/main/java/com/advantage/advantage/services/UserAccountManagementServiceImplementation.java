package com.advantage.advantage.services;

import com.advantage.advantage.models.CompanyAdministrator;
import com.advantage.advantage.models.Employee;
import com.advantage.advantage.models.TeamMember;

import com.advantage.advantage.repositories.CompanyAdministratorRepo;
import com.advantage.advantage.repositories.TeamMemberRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserAccountManagementServiceImplementation implements UserAccountManagementService {

    @Autowired
    private CompanyAdministratorRepo companyAdministratorRepository;

    @Autowired
    private TeamMemberRepo teamMemberRepository;

    @Override
    public List<Employee> getAllEmployee() {
        return null;
    }

    @Override
    public List<TeamMember> getAllTeamMembers() {
        return null;
    }

    @Override
    public List<CompanyAdministrator> getAllCompanyAdministrator() {
        return null;
    }

    @Override
    public List<Employee> getEmployeeByID(long employeeID) {
        return null;
    }

    @Override
    public List<TeamMember> getTeamMemberByID(long teamMemberID) {
        return null;
    }

    @Override
    public List<CompanyAdministrator> getCompanyAdministratorByID(long gymStaffID) {
        return null;
    }

    @Override
    public TeamMember saveTeamMember(TeamMember teamMember) {
        List<CompanyAdministrator> companyAdministrators = companyAdministratorRepository.findById(teamMember.getId());
        List<TeamMember> teamMembers = teamMemberRepository.findById(teamMember.getId());
        if(companyAdministrators  == null && teamMembers== null)
            return teamMemberRepository.save(teamMember);
        return  null;
    }

    @Override
    public CompanyAdministrator saveCompanyAdministrator(CompanyAdministrator companyAdministrator) {
        List<CompanyAdministrator> companyAdministrators = companyAdministratorRepository.findById(companyAdministrator.getId());
        List<TeamMember> teamMembers = teamMemberRepository.findById(companyAdministrator.getId());
        if(companyAdministrators  == null && teamMembers== null)
            return companyAdministratorRepository.save(companyAdministrator);
        return  null;
    }


}
