package com.advantage.advantage.services;

import com.advantage.advantage.models.CompanyAdministrator;
import com.advantage.advantage.models.Employee;
import com.advantage.advantage.models.TeamMember;

import com.advantage.advantage.repositories.CompanyAdministratorRepo;
import com.advantage.advantage.repositories.TeamMemberRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.advantage.advantage.helpers.IgnoredPropertyCreator;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserAccountManagementServiceImplementation implements UserAccountManagementService {

    private final CompanyAdministratorRepo companyAdministratorRepository;
    private final TeamMemberRepo teamMemberRepository;

    @Autowired
    public UserAccountManagementServiceImplementation(
            CompanyAdministratorRepo companyAdministratorRepository,
            @Qualifier("teamMemberRepo") TeamMemberRepo teamMemberRepository) {
        this.companyAdministratorRepository = companyAdministratorRepository;
        this.teamMemberRepository = teamMemberRepository;
    }

    private IgnoredPropertyCreator ignoredPropertyCreator;

    @Override
    public List<Employee> getAllEmployee() {
        List<Employee> result = new ArrayList<>();
        result.addAll(teamMemberRepository.findAll());
        result.addAll(companyAdministratorRepository.findAll());
        return result;
    }

    @Override
    public List<TeamMember> getAllTeamMembers() {
        return teamMemberRepository.findAll();
    }

    @Override
    public List<CompanyAdministrator> getAllCompanyAdministrator() {
        return companyAdministratorRepository.findAll();
    }

    @Override
    public List<Employee> getEmployeeByID(long employeeID) {
        List<TeamMember> teamMembers = teamMemberRepository.findById(employeeID);
        if(teamMembers == null || teamMembers.isEmpty())
        {
            List<CompanyAdministrator> companyAdministrators = companyAdministratorRepository.findById(employeeID);
            if(companyAdministrators == null || companyAdministrators.isEmpty())
                return null;
            else
            {
                return new ArrayList<>(companyAdministrators);
            }
        }
        else
        {
            return new ArrayList<>(teamMembers);
        }
    }

    @Override
    public List<Employee> getEmployeeByName(String name) {
        List<Employee> result = new ArrayList<>();

        List<TeamMember> teamMembers = teamMemberRepository.findByName(name);
        if(teamMembers != null && !teamMembers.isEmpty()) {
            result.addAll(teamMembers);
        }

        List<CompanyAdministrator> companyAdministrators = companyAdministratorRepository.findByName(name);
        if(companyAdministrators != null && !companyAdministrators.isEmpty()) {
            result.addAll(companyAdministrators);
        }

        return result;
    }

    @Override
    public List<TeamMember> getTeamMemberByID(long teamMemberID) {
        return teamMemberRepository.findById(teamMemberID);
    }

    @Override
    public TeamMember secureGetTeamMemberByID(long teamMemberID) {
        return teamMemberRepository.secureFindByUserId(teamMemberID);
    }

    @Override
    public List<TeamMember> getTeamMemberByEmail(String email) {
        return teamMemberRepository.findByEmail(email);
    }

    @Override
    public List<Object[]> getTeamMembersByTeamId(long teamId) {
        return teamMemberRepository.findByTeamId(teamId);
    }

    @Override
    public List<TeamMember> getAllTeamMembersByTeamId(long teamId) {
        return teamMemberRepository.findAllByTeamId(teamId);
    }

    @Override
    public List<Object[]> getAllTeamMembersByCompany(long companyAdminId) {
        return teamMemberRepository.findAllByCompanyAdministrator_Id(companyAdminId);
    }

    @Override
    public List<CompanyAdministrator> getCompanyAdministratorByID(long companyAdministratorID) {
        return companyAdministratorRepository.findById(companyAdministratorID);
    }

    @Override
    public List<CompanyAdministrator> secureGetCompanyAdministratorByID(long companyAdministratorID) {
        return companyAdministratorRepository.secureFindByUserId(companyAdministratorID);
    }

    @Override
    public List<CompanyAdministrator> getCompanyAdministratorByEmail(String email) {
        return companyAdministratorRepository.findByEmail(email);
    }

    @Override
    public List<CompanyAdministrator> getCompanyAdministratorByCompanyId(long companyID) {
        return companyAdministratorRepository.findByCompany_CompanyId(companyID);
    }

    @Override
    public TeamMember saveTeamMember(TeamMember teamMember) {
        List<CompanyAdministrator> companyAdministrators = companyAdministratorRepository.findByEmail(teamMember.getEmail());
        List<TeamMember> teamMembers = teamMemberRepository.findByEmail(teamMember.getEmail());
        if((companyAdministrators  == null || companyAdministrators.isEmpty()) && (teamMembers == null || teamMembers.isEmpty()))
            return teamMemberRepository.save(teamMember);
        return  null;
    }

    @Override
    public CompanyAdministrator saveCompanyAdministrator(CompanyAdministrator companyAdministrator) {
        List<CompanyAdministrator> companyAdministrators = companyAdministratorRepository.findByEmail(companyAdministrator.getEmail());
        List<TeamMember> teamMembers = teamMemberRepository.findByEmail(companyAdministrator.getEmail());
        if((companyAdministrators  == null || companyAdministrators.isEmpty()) && (teamMembers == null || teamMembers.isEmpty()))
            return companyAdministratorRepository.save(companyAdministrator);
        return  null;
    }

    @Override
    public TeamMember updateTeamMember(TeamMember teamMember) {
        return teamMemberRepository.save(teamMember);
    }

    @Override
    public CompanyAdministrator updateCompanyAdministrator(CompanyAdministrator companyAdministrator) {
        return companyAdministratorRepository.save(companyAdministrator);
    }

    @Override
    public TeamMember patchTeamMember(TeamMember editedTeamMember, long teamMemberId) {
        List<TeamMember> teamMembers = teamMemberRepository.findById(teamMemberId);
        if(teamMembers == null || teamMembers.isEmpty())
        {
            return null;
        }
        else
        {
            TeamMember oldTeamMember = teamMembers.get(0);
            ignoredPropertyCreator = IgnoredPropertyCreator.getInstance();
            ignoredPropertyCreator.setObj(editedTeamMember);
            String[] ignoredProperties = ignoredPropertyCreator.getNullPropertyNames();
            BeanUtils.copyProperties(editedTeamMember, oldTeamMember, ignoredProperties);
            teamMemberRepository.save(oldTeamMember);
            return oldTeamMember;
        }
    }

    @Override
    public CompanyAdministrator patchCompanyAdministrator(CompanyAdministrator editedCompanyAdministrator, long companyAdministratorId) {
        List<CompanyAdministrator> companyAdministrators = companyAdministratorRepository.findById(companyAdministratorId);
        if(companyAdministrators == null || companyAdministrators.isEmpty())
        {
            return null;
        }
        else
        {
            CompanyAdministrator oldCompanyAdministrator = companyAdministrators.get(0);
            ignoredPropertyCreator = IgnoredPropertyCreator.getInstance();
            ignoredPropertyCreator.setObj(editedCompanyAdministrator);
            String[] ignoredProperties = ignoredPropertyCreator.getNullPropertyNames();
            BeanUtils.copyProperties(editedCompanyAdministrator, oldCompanyAdministrator, ignoredProperties);
            companyAdministratorRepository.save(oldCompanyAdministrator);
            return oldCompanyAdministrator;
        }
    }

    @Override
    public TeamMember deleteTeamMemberByID(long teamMemberId) {
        return teamMemberRepository.deleteById(teamMemberId);
    }

    @Override
    public CompanyAdministrator deleteCompanyAdministratorByID(long companyAdministratorId) {
        return companyAdministratorRepository.deleteById(companyAdministratorId);
    }


}
