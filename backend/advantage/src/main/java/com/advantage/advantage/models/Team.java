package com.advantage.advantage.models;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @Getter @Setter private String teamName;
    @Column(columnDefinition = "integer default 0")
    @Getter @Setter private Integer usageLimit;
    @Column(columnDefinition = "integer default 0")
    @Getter @Setter private Integer monthlyAnalysisUsage;
  //  @Getter @Setter analysis reports

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "administrator_id", referencedColumnName = "id")
    @Getter @Setter private CompanyAdministrator companyAdministrator;

}
