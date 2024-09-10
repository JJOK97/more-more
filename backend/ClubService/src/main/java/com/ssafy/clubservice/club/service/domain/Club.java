package com.ssafy.clubservice.club.service.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Club {
    private Long clubId;
    private String clubImage;
    private Long dues;
    private String clubCode;
    private String clubName;

    @Builder
    private Club(Long clubId, String clubImage, Long dues, String clubCode, String clubName) {
        this.clubId = clubId;
        this.clubImage = clubImage;
        this.dues = dues;
        this.clubCode = clubCode;
        this.clubName = clubName;
    }
}
