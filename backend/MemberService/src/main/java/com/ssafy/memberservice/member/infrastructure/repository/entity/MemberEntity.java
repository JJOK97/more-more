package com.ssafy.memberservice.member.infrastructure.repository.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;


@Getter
@Setter
@AllArgsConstructor
public class MemberEntity {
    private Long memberId;
    private String accountNumber;
    private String address;
    private String email;
    private String phoneNumber;
    private String password;
    private Date birthDate;
    private String name;
    private String profileImageUrl;
    private String userKey;
    private String bank;


}
