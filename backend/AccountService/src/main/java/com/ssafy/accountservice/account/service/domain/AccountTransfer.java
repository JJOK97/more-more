package com.ssafy.accountservice.account.service.domain;

import lombok.Data;

@Data
public class AccountTransfer {
    String memberId;
    String transactionBalance;
    String clubCode;

    public AccountTransfer(String memberId, String transactionBalance, String clubCode) {
        this.memberId = memberId;
        this.transactionBalance = transactionBalance;
        this.clubCode = clubCode;
    }
}