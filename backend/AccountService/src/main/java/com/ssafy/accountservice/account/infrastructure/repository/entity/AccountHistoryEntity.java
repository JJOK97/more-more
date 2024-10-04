package com.ssafy.accountservice.account.infrastructure.repository.entity;

import lombok.Data;

@Data
public class AccountHistoryEntity {

    private Long accountHistoryId;           // 계좌 내역 ID
    private Long accountId;                  // 계좌 ID
    private String tagName;                  // 결제 태그
    private String ssafyTransactionNumber;   // SSAFY 거래 번호
    private String accountDate;              // 결제 날짜
    private String accountTime;              // 결제 시각
    private String paymentType;              // 결제 타입
    private String paymentAmount;            // 결제 금액
    private String accountBalance;           // 계좌 잔고
    private String accountHistoryVerificationContent; // 계좌 내역 증빙 내용 (nullable)
}