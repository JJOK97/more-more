package com.ssafy.memberservice.member.controller.dto.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String phoneNumber;
    private String password;
}
