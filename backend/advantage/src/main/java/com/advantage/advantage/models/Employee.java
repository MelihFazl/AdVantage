package com.advantage.advantage.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;

@Data
@Entity
@Table(name="employee")
public class Employee
{
    @Id
    private long id;
    private String name;
}
