package com.advantage.advantage.models;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Random;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Token {
    @Column(name = "token", columnDefinition = "TEXT")
    private String token;
    private Boolean inUse;
    private LocalDateTime lastActive;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    public String generateToken()
    {
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@.-*!";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 400) { // length of the random string.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String saltStr = salt.toString();
        this.token = saltStr;
        return saltStr;
    }
}
