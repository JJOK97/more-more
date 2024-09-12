package com.ssafy.clubservice.club.service.domain;

import com.ssafy.clubservice.club.service.UUIDHolder;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
public class Club {
    private Long clubId;
    private String clubImage;
    private Long dues;
    private String clubCode;
    private String clubName;
    private String clubIntro;
    private LocalDate createdDate;
    List<Participant> participants = new ArrayList<>();

    @Builder
    public Club(String clubName, String clubCode, Long dues, String clubImage, Long clubId, LocalDate createdDate, String clubIntro) {
        this.createdDate = createdDate;
        this.clubIntro = clubIntro;
        this.clubName = clubName;
        this.clubCode = clubCode;
        this.dues = dues;
        this.clubImage = clubImage;
        this.clubId = clubId;
    }

    public Club addCreator(Long creatorId) {
        this.participants.add(Participant.createClubParticipant(this.clubCode, creatorId));
        return this;
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
