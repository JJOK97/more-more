package com.ssafy.accountservice.account.controller.dto.request;

import lombok.Data;

// 보내기 로직
@Data
public class AccountTransferRequest {
    // 입금 계좌, 이체 금액, 클럽코드
    private String ssafyAccountNumber;
    private String transactionBalance;
    private String clubCode;
}
