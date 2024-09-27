package com.ssafy.memberservice.global.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Component
public class JwtTokenProvider {

    private final Key key; // 서명 키는 한번 생성되고, 동일하게 사용
    private final RedisTemplate<String, String> redisTemplate;

    @Value("${jwt.accessTokenExpirationMs}")
    private int accessTokenExpirationMs;

    @Value("${jwt.refreshTokenExpirationMs}")
    private int refreshTokenExpirationMs;

    // 생성자: 서명 키를 생성하고 Redis를 주입
    public JwtTokenProvider(RedisTemplate<String, String> redisTemplate) {
        this.key = Keys.secretKeyFor(SignatureAlgorithm.HS512); // HS512를 위한 안전한 키 생성
        this.redisTemplate = redisTemplate;
    }

    // 액세스 토큰 생성
    public String generateAccessToken(Authentication authentication) {
        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();
        Instant now = Instant.now();

        return Jwts.builder()
                .setSubject(userPrincipal.getUsername()) // username은 phoneNumber로 설정
                .setIssuedAt(Date.from(now)) // 발급 시간 설정
                .setExpiration(Date.from(now.plusMillis(accessTokenExpirationMs))) // 만료 시간 설정
                .signWith(key)  // 생성된 키로 서명
                .compact();
    }

    // 리프레시 토큰 생성 및 Redis 저장
    public String generateAndStoreRefreshToken(Authentication authentication) {
        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();
        Instant now = Instant.now();

        // Redis에 저장된 이전 리프레시 토큰 삭제
        redisTemplate.delete(userPrincipal.getUsername());

        String refreshToken = Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plusMillis(refreshTokenExpirationMs)))
                .signWith(key) // 동일한 키로 서명
                .compact();

        // Redis에 Refresh Token 저장
        redisTemplate.opsForValue().set(
                userPrincipal.getUsername(), // phoneNumber를 key로 사용
                refreshToken,
                refreshTokenExpirationMs, TimeUnit.MILLISECONDS // Redis 만료시간 설정
        );

        return refreshToken;
    }

    // JWT 토큰에서 전화번호 추출
    public String getPhoneNumberFromJwtToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key) // 동일한 키로 검증
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject(); // phoneNumber 추출
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("JWT 토큰에서 전화번호 추출에 실패했습니다.");
        }
    }

    // JWT 토큰 유효성 검증
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(authToken);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // Redis에서 Refresh Token 검증
    public boolean validateRefreshToken(String refreshToken, String phoneNumber) {
        String storedToken = redisTemplate.opsForValue().get(phoneNumber); // Redis에서 token을 가져옴
        if (storedToken == null) {
            System.out.println("Redis에서 토큰을 찾을 수 없습니다: " + phoneNumber);
            return false;
        }
        return refreshToken.equals(storedToken); // 저장된 토큰과 비교
    }

    // Redis에서 Refresh Token 삭제 (로그아웃 처리용)
    public void deleteRefreshToken(String phoneNumber) {
        redisTemplate.delete(phoneNumber); // Redis에서 token 삭제
    }
}

