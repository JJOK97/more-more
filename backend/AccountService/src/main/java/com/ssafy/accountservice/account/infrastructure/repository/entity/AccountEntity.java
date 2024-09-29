package com.ssafy.accountservice.account.infrastructure.repository.entity;

import lombok.Builder;
import lombok.Data;

@Data
public class AccountEntity {
    private Integer accountId; // ID 필드 추가
    private String ssafyAccountNumber;
    private String clubCode;
    private String clubPassword;

    @Builder
    public AccountEntity(Integer accountId, String ssafyAccountNumber, String clubCode, String clubPassword) {
        this.accountId = accountId;
        this.ssafyAccountNumber = ssafyAccountNumber;
        this.clubCode = clubCode;
        this.clubPassword = clubPassword;
    }

    public AccountEntity() {

    }
}
