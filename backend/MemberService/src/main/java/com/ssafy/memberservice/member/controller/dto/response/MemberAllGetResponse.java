package com.ssafy.memberservice.member.controller.dto.response;


import lombok.Data;

@Data
public class MemberAllGetResponse {
    private Long memberId;
    private String phoneNumber;
    private String name;


}
