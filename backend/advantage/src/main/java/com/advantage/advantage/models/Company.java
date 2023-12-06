package com.advantage.advantage.models;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;



@Entity
@Table(name="company")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter private Long companyId;
    @Getter @Setter private String companyName;
    @Getter @Setter private int numberOfEmployees;



    @OneToOne(optional = false)
    @JoinColumn(name = "company_admin", referencedColumnName = "id")
    @Getter @Setter private CompanyAdministrator companyAdministrator;
}
