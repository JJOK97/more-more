package com.ssafy.clubservice.global.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;



@Component
public class JwtUtilImpl implements JwtUtil{
    private final SecretKey secretKey;

    @Value("${jwt.ssafyKey}")
    private String ssafyKey;


    public JwtUtilImpl(@Value("${jwt.key}") String jwtKey){
        this.secretKey = Keys.hmacShaKeyFor(jwtKey.getBytes(StandardCharsets.UTF_8));
    }

    public String extractSsafyKeyFromToken(String token){
        Claims claims = this.validateAndExtractClaims(removeBearer(token));
        System.out.println(ssafyKey);
        return claims.get(ssafyKey).toString();
    }

    private String removeBearer(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);  // Extract token part after 'Bearer '
        }
        return authHeader;
    }
    private Claims validateAndExtractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
