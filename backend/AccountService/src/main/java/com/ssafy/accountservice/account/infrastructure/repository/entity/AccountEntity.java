package com.ssafy.accountservice.account.infrastructure.repository.entity;

import lombok.Builder;
import lombok.Data;

@Data
public class AccountEntity {
    private String accountId; // ID 필드 추가
    private String ssafyAccountNumber;
    private String clubCode;
    private String clubPassword;
    private String ssafyUserKey;

    @Builder
    public AccountEntity(String accountId, String ssafyAccountNumber, String clubCode, String clubPassword, String ssafyUserKey) {
        this.accountId = accountId;
        this.ssafyAccountNumber = ssafyAccountNumber;
        this.clubCode = clubCode;
        this.clubPassword = clubPassword;
        this.ssafyUserKey = ssafyUserKey;
    }

    public AccountEntity() {

    }
}
