package com.advantage.advantage.models;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name="team_member")
public class TeamMember extends Employee{
    @Getter @Setter int monthlyAnalysisUsage;
    @ManyToOne
    @JoinColumn(name = "team_id", referencedColumnName = "teamId")
    private Team team;

    @ManyToOne
    @JoinColumn(name = "administrator_id", referencedColumnName = "id")
    private CompanyAdministrator companyAdministrator;

}
