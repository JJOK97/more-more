package com.ssafy.accountservice.account.controller.dto.request;

import lombok.Data;

@Data
public class VerificationSaveRequest {
    private String accountHistoryMemo;
    private String accountHistoryImage;
    private String tagName;
}