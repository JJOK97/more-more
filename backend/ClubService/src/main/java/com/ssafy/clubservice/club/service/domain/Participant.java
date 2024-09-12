package com.ssafy.clubservice.club.service.domain;

import com.ssafy.clubservice.club.enumeration.AcceptanceStatus;
import com.ssafy.clubservice.club.enumeration.ClubRole;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class Participant {
    private Long participantId;
    private String clubCode;
    private Long userId;
    private ClubRole clubRole;
    private AcceptanceStatus acceptanceStatus;
    private LocalDateTime createdDate;

    @Builder
    public Participant(Long participantId, String clubCode, Long userId, ClubRole clubRole, AcceptanceStatus acceptanceStatus, LocalDateTime createdDate) {
        this.participantId = participantId;
        this.clubCode = clubCode;
        this.userId = userId;
        this.clubRole = clubRole;
        this.acceptanceStatus = acceptanceStatus;
        this.createdDate = createdDate;
    }

    public static Participant createClubCreator(String clubCode, Long userId){
        return Participant.builder()
                .clubCode(clubCode)
                .userId(userId)
                .clubRole(ClubRole.CREATOR)
                .acceptanceStatus(AcceptanceStatus.ACCEPTED)
                .build();
        // TODO paritipant가 없을 때 exception 발생 로직 추가
    }

    public static Participant createClubParticipant(String clubCode, Long userId){
        return Participant.builder()
                .clubCode(clubCode)
                .userId(userId)
                .clubRole(ClubRole.PARTICIPANT)
                .acceptanceStatus(AcceptanceStatus.WAITING)
                .build();
    }

}
