package com.ssafy.clubservice.club.service.domain;

import com.ssafy.clubservice.club.service.UUIDHolder;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

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
    public Club generateClubCode(UUIDHolder uuidHolder){
        this.clubCode = uuidHolder.getUUID();
        return this;
    }

    public Club changeImageName(String imageFileName) {
        this.clubImage = imageFileName;
        return this;
    }

    public Club update(Club club){
        this.dues = (club.getDues() != null) ? club.getDues() : this.dues;
        this.clubName = (club.getClubName() != null) ? club.getClubName() : this.clubName;
        return this;
    }

}
