package com.advantage.advantage.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="AdvantageAdministrator")
public class AdvantageAdministrator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Long id;
    @Getter @Setter private String email;
    @Getter @Setter private String hashedPassword;
}
