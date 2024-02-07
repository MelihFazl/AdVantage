package com.advantage.advantage.models;
import com.advantage.advantage.services.UserAccountManagementService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.*;

import java.security.InvalidParameterException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Token {
    @Column(name = "token", columnDefinition = "TEXT")
    private String token;
    private Boolean inUse;
    //private LocalDateTime lastActive;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID; //tokenID

    //private Long userId;
    //private String userType;
    private static final int EXPIRATION_TIME = 900000; // 15 minutes in milliseconds;

    /*
    public String generateToken()
    {
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@.-*!";
        StringBuilder salt = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();
        while (salt.length() < 400) { // length of the random string.
            int index = (int) (secureRandom.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String saltStr = salt.toString();
        this.token = saltStr;
        return saltStr;
    }
    */

    public String generateToken(Long userId, String userType) {
        String jwtToken = Jwts.builder()
                .setSubject("userSubject")  // example subject
                .claim("userId", userId)
                .claim("userType", userType)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, "e05a2f6a664d5bd168a648c16a14e8e07fdae61504008be167e7c52820205a18681c1b3ce4cdd18186e3e886b997a138ea3848ac3984b04588b295407dbf51f8")  // replace with your secret key
                .compact();

        this.token = jwtToken;
        return jwtToken;
    }
}
