package com.ssafy.accountservice.account.controller.dto.request;

import lombok.Data;

// 채우기 로직
@Data
public class AccountTransferFillRequest {
    // 출금 계좌, 이체 금액, 입금자 userKey, 클럽코드
    private String memberId;
    private String transactionBalance;
    private String clubCode;
}