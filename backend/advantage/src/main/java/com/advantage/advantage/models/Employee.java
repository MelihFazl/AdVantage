package com.advantage.advantage.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@MappedSuperclass
@Table(name="employee")
public abstract class Employee
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter private long id;
    @Getter @Setter private String name;
    @Getter @Setter private String surname;
    @Column(unique = true)
    @Getter @Setter private String email;

    @JsonIgnore
    @Getter @Setter private String hashedPassword;

    @JsonIgnore
    @OneToOne
    @Getter @Setter private Token token;
}
