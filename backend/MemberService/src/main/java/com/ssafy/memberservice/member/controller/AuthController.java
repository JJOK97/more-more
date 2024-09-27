package com.ssafy.memberservice.member.controller;


import com.ssafy.memberservice.global.security.JwtTokenProvider;
import com.ssafy.memberservice.member.controller.dto.request.LoginRequest;
import com.ssafy.memberservice.member.controller.dto.response.JwtResponse;
import com.ssafy.memberservice.member.service.CustomUserDetailsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@Tag(name = "Auth", description = "인증 API")
public class AuthController {
    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;

    private final CustomUserDetailsService customUserDetailsService;


    @Operation(summary = "로그인 API", description = "전화번호와 비밀번호로 로그인(성공시 token) (access token)")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {


        try {
            String phoneNumber = loginRequest.getPhoneNumber();
            String password = loginRequest.getPassword();

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(phoneNumber, password)
            );

            String accessToken = jwtTokenProvider.generateAccessToken(authentication);
            String refreshToken = jwtTokenProvider.generateAndStoreRefreshToken(authentication); // Refresh Token 저장

            return ResponseEntity.ok(new JwtResponse(accessToken, refreshToken));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Invalid phone number or password");
        }
    }
    @Operation(summary = "토큰발급 API", description = "리프레시 토큰으로 해당(성공시 token) (access token)")
    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshAccessToken(@RequestBody String refreshToken) {
        try {
            String phoneNumber = jwtTokenProvider.getPhoneNumberFromJwtToken(refreshToken);
            // Redis에서 Refresh Token 검증
            if (jwtTokenProvider.validateRefreshToken(refreshToken, phoneNumber)) {
                UserDetails userDetails = customUserDetailsService.loadUserByUsername(phoneNumber);

                String newAccessToken = jwtTokenProvider.generateAccessToken(
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities()));

                return ResponseEntity.ok(new JwtResponse(newAccessToken, refreshToken));
            } else {
                return ResponseEntity.status(401).body("Invalid refresh token");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred");
        }
    }

    @PostMapping("/logout")
    @Operation(summary = "토큰발급 API", description = "핸드폰 번호로 로그아웃 (access token)")
    public ResponseEntity<?> logout(@RequestParam String phoneNumber) {
        // Redis에서 Refresh Token 삭제 (로그아웃 처리)
        jwtTokenProvider.deleteRefreshToken(phoneNumber);
        return ResponseEntity.ok("Logged out successfully");
    }

}
