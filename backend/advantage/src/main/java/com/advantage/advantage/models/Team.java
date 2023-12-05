package com.advantage.advantage.models;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Entity
@Table(name="team")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter private Long teamId;

    @ManyToOne
    @JoinColumn(name = "administrator_id", referencedColumnName = "id")
    @Getter @Setter private CompanyAdministrator companyAdministrator;
}
