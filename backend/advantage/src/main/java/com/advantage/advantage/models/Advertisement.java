package com.advantage.advantage.models;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@MappedSuperclass
@Table(name="advertisement")
public abstract class Advertisement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter private Long advertisementId;
    @Getter @Setter private AdCategory category;
    @Getter @Setter private Date uploadedAt;
    @ManyToOne
    @JoinColumn(name = "team_member_id", referencedColumnName = "id")
    @Getter @Setter private TeamMember uploader;

    @ManyToOne
    @JoinColumn(name = "team_id", referencedColumnName = "teamId")
    @Getter @Setter private Team team;
}
