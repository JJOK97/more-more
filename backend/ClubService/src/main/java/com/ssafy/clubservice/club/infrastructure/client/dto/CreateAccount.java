package com.ssafy.clubservice.club.infrastructure.client.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class CreateAccount {
    private String ssafyUserKey;
    private String clubCode;
    private String pwd;

    @Builder
    CreateAccount(String ssafyUserKey, String clubCode, String pwd) {
        this.ssafyUserKey = ssafyUserKey;
        this.clubCode = clubCode;
        this.pwd = pwd;
    }

}
