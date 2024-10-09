package com.ssafy.accountservice.account.infrastructure.repository.entity;

import lombok.Data;

@Data
public class VerifyEntity {
    private Long accountHistoryImageId; // 자동 생성되는 계좌내역 이미지 ID
    private String ssafyTransactionNumber;
    private String accountHistoryMemo;
    private String accountHistoryImage;  // 계좌내역증빙 이미지
}
