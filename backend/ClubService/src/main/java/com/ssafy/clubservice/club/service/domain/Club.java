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
    private List<Participant> participants;

    @Builder
    public Club(Long clubId, String clubImage, Long dues, String clubCode, String clubName, String clubIntro, LocalDate createdDate, List <Participant> participants) {
        this.clubId = clubId;
        this.clubImage = clubImage;
        this.dues = dues;
        this.clubCode = clubCode;
        this.clubName = clubName;
        this.clubIntro = clubIntro;
        this.createdDate = createdDate;
        this.participants =  participants;
    }

    public Club makeClubCreator(Long creatorId) {
        if(this.participants == null) participants = new ArrayList<>();
        this.participants.add(Participant.createClubCreator(this.clubCode, creatorId));
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

    public Club updateClub(Club club){
        this.dues = (club.getDues() != null) ? club.getDues() : this.dues;
        this.clubName = (club.getClubName() != null) ? club.getClubName() : this.clubName;
        this.clubIntro = (club.getClubIntro() != null) ? club.getClubIntro() : this.clubIntro;
        return this;
    }

    public Club changeParticipant(List<Participant> participants) {
        this.participants = participants;
        return this;
    }
}
