package com.ssafy.clubservice.club.service.domain;

import com.ssafy.clubservice.club.enumeration.AcceptanceStatus;
import com.ssafy.clubservice.club.enumeration.ClubRole;
import lombok.Builder;
import lombok.Getter;

@Getter
public class Participant {
    private Long participantId;
    private Long clubId;
    private Long userId;
    private ClubRole clubRole;
    private AcceptanceStatus acceptanceStatus;

    @Builder
    public Participant(Long participantId, Long clubId, Long userId, ClubRole clubRole, AcceptanceStatus acceptanceStatus) {
        this.participantId = participantId;
        this.clubId = clubId;
        this.userId = userId;
        this.clubRole = clubRole;
        this.acceptanceStatus = acceptanceStatus;
    }

    public static Participant createClubCreator(Long clubId, Long userId){
        return Participant.builder()
                .clubId(clubId)
                .userId(userId)
                .clubRole(ClubRole.CREATOR)
                .acceptanceStatus(AcceptanceStatus.ACCEPTED)
                .build();
    }

    public static Participant createClubParticipant(Long clubId, Long userId){
        return Participant.builder()
                .clubId(clubId)
                .userId(userId)
                .clubRole(ClubRole.PARTICIPANT)
                .acceptanceStatus(AcceptanceStatus.WAITING)
                .build();
    }

}
