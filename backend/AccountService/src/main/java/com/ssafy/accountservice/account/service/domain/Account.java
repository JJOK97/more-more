package com.ssafy.accountservice.account.service.domain;

import lombok.Builder;
import lombok.Data;

@Data
public class Account {
    private String ssafyUserKey;
    private String memberId;
    private String pwd;

    @Builder
    public Account(String ssafyUserKey, String memberId, String pwd) {
        this.ssafyUserKey = ssafyUserKey;
        this.memberId = memberId;
        this.pwd = pwd;
    }
}