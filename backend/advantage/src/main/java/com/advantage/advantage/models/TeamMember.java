package com.advantage.advantage.models;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="team_member")
@PrimaryKeyJoinColumn(name = "employee_id")
public class TeamMember extends Employee{
    @Getter @Setter int monthlyAnalysisUsage;
    @ManyToMany
    @JoinTable(
            name = "team_member_teams",
            joinColumns = @JoinColumn(name = "team_member_id"),
            inverseJoinColumns = @JoinColumn(name = "team_id")
    )
    @Getter @Setter
    private List<Team> teams = new ArrayList<>();

    @ManyToOne
    @Getter @Setter
    @JoinColumn(name = "administrator_id", referencedColumnName = "id")
    private CompanyAdministrator companyAdministrator;
}
