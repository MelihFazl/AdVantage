package com.advantage.advantage.services;

import com.advantage.advantage.models.Company;
import com.advantage.advantage.repositories.CompanyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyServiceImplementation implements CompanyService{

    private final CompanyRepo companyRepository;

    @Autowired
    public CompanyServiceImplementation(CompanyRepo companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @Override
    public List<Company> getByCompanyId(long companyId) {
        return companyRepository.findByCompanyId(companyId);
    }

    @Override
    public List<Company> getByCompanyName(String companyName) {
        return companyRepository.findByCompanyName(companyName);
    }

    @Override
    public Company saveCompany(Company company) {
        List<Company> companies = companyRepository.findByCompanyId(company.getCompanyId());

        if(companies == null) {
            return companyRepository.save(company);
        }

        return null;
    }

    @Override
    public Company updateCompany(Company company) {
        return companyRepository.save(company);
    }

    @Override
    public Company deleteCompanyById(long companyId) {
        return companyRepository.deleteByCompanyId(companyId);
    }
}
