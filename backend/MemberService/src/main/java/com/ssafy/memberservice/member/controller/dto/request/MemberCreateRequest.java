package com.ssafy.memberservice.member.controller.dto.request;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;

@Data
public class MemberCreateRequest {

    private String accountNumber;
    private String address;
    private String email;
    private String phoneNumber;
    private String password;
    private Date birthDate;
    private String name;
    private MultipartFile profileImage;
    private String bank;
}
