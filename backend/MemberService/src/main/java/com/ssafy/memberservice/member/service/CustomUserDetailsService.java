package com.ssafy.memberservice.member.service;

import com.ssafy.memberservice.member.infrastructure.repository.MemberRepository;
import com.ssafy.memberservice.member.infrastructure.repository.entity.MemberEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;  // 회원 정보를 가져올 repository

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 전화번호로 사용자 조회
        MemberEntity member = memberRepository.findByPhoneNumber(username);

        // 사용자 정보가 없으면 예외 발생
        if (member == null) {
            throw new UsernameNotFoundException("User not found with phone number: " + username);
        }

        // UserDetails 객체로 반환
        return new org.springframework.security.core.userdetails.User(
                member.getPhoneNumber(),
                member.getPassword(),
                new ArrayList<>() // 권한 설정 (기본 권한 사용)
        );
    }
}
