package com.advantage.advantage.services;


import com.advantage.advantage.models.Company;
import java.util.List;

public interface CompanyService {
    public List<Company> getAllCompanies();

    public List<Company> getByCompanyId(long companyId);

    public List<Company> getByCompanyName(String companyName);

    public Company saveCompany(Company company);

    public Company updateCompany(Company company);

    public Company deleteCompanyById(long companyId);
}
