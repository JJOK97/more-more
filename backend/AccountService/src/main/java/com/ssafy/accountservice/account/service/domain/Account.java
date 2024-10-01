package com.ssafy.accountservice.account.service.domain;

import lombok.Builder;
import lombok.Data;

@Data
public class Account {
    private String ssafyUserKey;
    private String clubCode;
    private String memberId;
    private String pwd;

    public Account(String ssafyUserKey, String clubCode, String memberId, String pwd) {
        this.ssafyUserKey = ssafyUserKey;
        this.clubCode = clubCode;
        this.memberId = memberId;
        this.pwd = pwd;
    }
}