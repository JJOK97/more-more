package com.ssafy.accountservice.account.service.domain;

import lombok.Data;

@Data
public class Account {
    private String ssafyUserKey;
    private String clubCode;
    private String pwd;

    public Account(String ssafyUserKey, String clubCode, String pwd) {
        this.ssafyUserKey = ssafyUserKey;
        this.clubCode = clubCode;
        this.pwd = pwd;
    }
}