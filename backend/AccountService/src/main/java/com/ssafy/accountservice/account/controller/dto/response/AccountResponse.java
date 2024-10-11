package com.ssafy.accountservice.account.controller.dto.response;

import lombok.Data;

@Data
public class AccountResponse {
    private String ssafyAccountNumber;
    private String clubCode;
    private String clubPassword;
}
