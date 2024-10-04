package com.ssafy.accountservice.account.service.domain;

import lombok.Data;

@Data
public class AccountTransfer {
    String depositAccountNo;
    String transactionBalance;
    String userKey;
    String clubCode;

    public AccountTransfer(String depositAccountNo, String transactionBalance, String userKey, String clubCode) {
        this.depositAccountNo = depositAccountNo;
        this.transactionBalance = transactionBalance;
        this.userKey = userKey;
        this.clubCode = clubCode;
    }
}