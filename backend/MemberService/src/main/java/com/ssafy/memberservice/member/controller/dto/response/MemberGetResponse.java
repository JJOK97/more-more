package com.ssafy.memberservice.member.controller.dto.response;

import lombok.Data;

import java.sql.Date;

@Data
public class MemberGetResponse {
    private Long memberId;
    private String accountNumber;
    private String address;
    private String email;
    private String phoneNumber;
    private Date birthDate;
    private String name;
    private String profileImageUrl;

}
