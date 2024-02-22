package com.advantage.advantage.helpers;

import com.advantage.advantage.models.CompanyAdministrator;
import com.advantage.advantage.models.TeamMember;
import com.advantage.advantage.services.UserAccountManagementService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import io.jsonwebtoken.JwtException;
import java.security.InvalidParameterException;
import java.util.Date;
import java.util.List;

public class JwtUtils {
    private static final String SECRET_KEY = "e05a2f6a664d5bd168a648c16a14e8e07fdae61504008be167e7c52820205a18681c1b3ce4cdd18186e3e886b997a138ea3848ac3984b04588b295407dbf51f8";

    private final UserAccountManagementService userAccountManagementService;

    public JwtUtils(UserAccountManagementService userAccountManagementService) {
        this.userAccountManagementService = userAccountManagementService;
    }

    public Claims getClaimsFromToken(String jwtToken) throws JwtException {
        try {
            return Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(jwtToken)
                    .getBody();
        } catch (ExpiredJwtException e) {
            // Handle expired token
            System.out.println("Expired token: " + e.getMessage());
            throw e;
        } catch (UnsupportedJwtException | MalformedJwtException | SignatureException e) {
            // Handle other specific JWT exceptions
            System.out.println("Invalid token: " + e.getMessage());
            throw e;
        } catch (JwtException e) {
            // Catch the generic JWT exception
            System.out.println("JWT exception: " + e.getMessage());
            throw e;
        }
    }

    public Long getUserId(String jwtToken) {
        Claims claims = getClaimsFromToken(jwtToken);
        return claims.get("userId", Long.class);
    }

    public String getUserType(String jwtToken) {
        Claims claims = getClaimsFromToken(jwtToken);
        return claims.get("userType", String.class);
    }

    public boolean validateToken(String jwtToken) {
        return validateToken(jwtToken, null);
    }

    public boolean validateToken(String jwtToken, String authorization) {
        try {
            Claims claims = getClaimsFromToken(jwtToken);

            // Now you can access individual claims
            Long userId = claims.get("userId", Long.class);
            String userType = claims.get("userType", String.class);

            if (authorization != null && !authorization.equals(userType)) {
                return false;
            }

            // Check if token is not expired
            Date expirationDate = claims.getExpiration();
            Date currentDate = new Date();
            if (expirationDate != null && expirationDate.before(currentDate)) {
                throw new InvalidParameterException("Authentication Error: Token has expired");
            }

            // Add additional validation if needed
            if (!userType.equals("TM") && !userType.equals("CA")) {
                throw new InvalidParameterException("Authentication Error: Invalid token & user type");
            } else if (userType.equals("TM")) {
                List<TeamMember> teamMember = userAccountManagementService.getTeamMemberByID(userId);
                return teamMember != null && !teamMember.isEmpty() && teamMember.get(0).getToken().getInUse();
            } else {
                List<CompanyAdministrator> companyAdministrator = userAccountManagementService.getCompanyAdministratorByID(userId);
                return companyAdministrator != null && !companyAdministrator.isEmpty() && companyAdministrator.get(0).getToken().getInUse();
            }
        } catch (Exception e) {
            // Handle invalid token
            System.out.println(e.getMessage());
            return false;
        }
    }
}

