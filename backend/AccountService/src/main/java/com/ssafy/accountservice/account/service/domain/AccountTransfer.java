package com.ssafy.accountservice.account.service.domain;

import lombok.Data;

@Data
public class AccountTransfer {
    String ssafyAccountNumber;
    String transactionBalance;
    String clubCode;

    public AccountTransfer(String ssafyAccountNumber, String transactionBalance, String clubCode) {
        this.ssafyAccountNumber = ssafyAccountNumber;
        this.transactionBalance = transactionBalance;
        this.clubCode = clubCode;
    }
}