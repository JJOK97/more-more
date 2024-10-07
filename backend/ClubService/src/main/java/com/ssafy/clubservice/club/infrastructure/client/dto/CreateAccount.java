package com.ssafy.clubservice.club.infrastructure.client.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class CreateAccount {
    private String ssafyUserKey;
    private String clubCode;

    @Builder
    CreateAccount(String ssafyUserKey, String clubCode) {
        this.ssafyUserKey = ssafyUserKey;
        this.clubCode = clubCode;
    }

}
