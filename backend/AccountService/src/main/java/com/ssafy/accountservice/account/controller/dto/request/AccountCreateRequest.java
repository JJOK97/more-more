package com.ssafy.accountservice.account.controller.dto.request;

import lombok.Data;

@Data
public class AccountCreateRequest {
    private String ssafyUserKey;
    private String clubCode;
    private String pwd;
}