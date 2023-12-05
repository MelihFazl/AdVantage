package com.advantage.advantage.models;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="company_administrator")
public class CompanyAdministrator extends Employee{

    //companyden alıcak reference olcak
    //@Getter private long companyId;


}
