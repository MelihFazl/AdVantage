package com.advantage.advantage.models;

import jakarta.persistence.*;
import lombok.Data;
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
    @Getter @Setter private String email;
    @Getter @Setter private String hashedPassword;

    @OneToOne
    @Getter @Setter private Token token;
}
