package com.advantage.advantage.models;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="company_administrator")
public class CompanyAdministrator extends Employee{

    @OneToOne(mappedBy = "companyAdministrator")
    @Getter @Setter private Company company;

}
