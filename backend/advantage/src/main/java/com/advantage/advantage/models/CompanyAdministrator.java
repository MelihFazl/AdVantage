package com.advantage.advantage.models;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="company_administrator")
public class CompanyAdministrator extends Employee{
    @OneToOne
    @JoinColumn(name = "company_id", referencedColumnName = "companyId")
    @Getter @Setter private Company company;
}
