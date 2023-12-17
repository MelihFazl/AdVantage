package com.advantage.advantage.models;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name="team_member")
@PrimaryKeyJoinColumn(name = "employee_id")
public class TeamMember extends Employee{
    @Getter @Setter int monthlyAnalysisUsage;
    @ManyToOne
    @Getter @Setter @JoinColumn(name = "team_id", referencedColumnName = "teamId")
    private Team team;

    @ManyToOne
    @JoinColumn(name = "administrator_id", referencedColumnName = "id")
    private CompanyAdministrator companyAdministrator;

}
