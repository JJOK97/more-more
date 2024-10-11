package com.ssafy.clubservice.club.service.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Account {
    private String ssafyKey;
    private String pwd;

    @Builder
    public Account(String ssafyKey, String pwd) {
        this.ssafyKey = ssafyKey;
        this.pwd = pwd;
    }
}
