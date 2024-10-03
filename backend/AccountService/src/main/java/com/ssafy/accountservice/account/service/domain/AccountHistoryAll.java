package com.ssafy.accountservice.account.service.domain;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Data
public class AccountHistoryAll {
    private Long accountHistoryId;           // 계좌 내역 ID
    private Long accountId;                  // 계좌 ID
    private String tagName;                  // 결제 태그
    private String ssafyTransactionNumber;   // SSAFY 거래 번호
    private String accountDate;              // 결제 날짜 (YYYYMMDD 형식)
    private String accountTime;              // 결제 시각 (HHmmss 형식)
    private String paymentType;              // 결제 타입
    private String paymentAmount;            // 결제 금액
    private String accountBalance;           // 계좌 잔고
    private String accountHistoryVerificationContent; // 계좌 내역 증빙 내용

    // 기본 생성자: accountDate와 accountTime을 현재 날짜와 시간으로 설정 (YYYYMMDD, HHmmss 형식)
    public AccountHistoryAll() {
        this.accountDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        this.accountTime = LocalTime.now().format(DateTimeFormatter.ofPattern("HHmmss"));
    }

    // 모든 필드를 초기화하는 생성자
    public AccountHistoryAll(Long accountId, String tagName, String ssafyTransactionNumber,
                             String paymentType, String paymentAmount, String accountBalance,
                             String accountHistoryVerificationContent) {
        this.accountId = accountId;
        this.tagName = tagName;
        this.ssafyTransactionNumber = ssafyTransactionNumber;
        this.accountDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")); // 현재 날짜 (YYYYMMDD 형식)
        this.accountTime = LocalTime.now().format(DateTimeFormatter.ofPattern("HHmmss"));   // 현재 시간 (HHmmss 형식)
        this.paymentType = paymentType;
        this.paymentAmount = paymentAmount;
        this.accountBalance = accountBalance;
        this.accountHistoryVerificationContent = accountHistoryVerificationContent;
    }
}
