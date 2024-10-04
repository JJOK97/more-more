package com.ssafy.accountservice.account.service.domain;

import lombok.Data;

@Data
public class AccountNumAndBalanceSelect {
    String clubCode;
    String accountNumber;
    String accountBalance;


    public AccountNumAndBalanceSelect(String clubCode, String accountNumber, String accountBalance) {
        this.clubCode = clubCode;
        this.accountNumber = accountNumber;
        this.accountBalance = accountBalance;
    }
}
