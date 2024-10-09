package com.ssafy.clubservice.club.service.domain;

import com.ssafy.clubservice.club.enumeration.AcceptanceStatus;
import com.ssafy.clubservice.club.enumeration.ClubRole;
import com.ssafy.clubservice.global.error.exception.NoSuchAcceptanceStatusException;
import com.ssafy.clubservice.global.error.exception.NoSuchClubRoleException;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

import static com.ssafy.clubservice.global.error.ErrorCode.*;

@Getter
public class Participant {
    private Long participantId;
    private String clubCode;
    private Long userId;
    private ClubRole clubRole;
    private AcceptanceStatus acceptanceStatus;
    private LocalDateTime createdDate;

    private static List<String> clubRoleValues = List.of("CREATOR", "PARTICIPANT");
    private static List<String> acceptanceStatusValues = List.of("WAITING", "ACCEPTED", "REFUSED");


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
    }

    public static Participant createClubParticipant(String clubCode, Long userId){
        return Participant.builder()
                .clubCode(clubCode)
                .userId(userId)
                .clubRole(ClubRole.PARTICIPANT)
                .acceptanceStatus(AcceptanceStatus.WAITING)
                .build();
    }

    public static boolean isValidClubRole (String clubRole){
        if(!clubRoleValues.contains(clubRole)) throw new NoSuchClubRoleException(NO_SUCH_CLUB_ROLE);
        return true;
    }

    public static boolean isValidAcceptanceStatus (String acceptanceStatus){
        if(!acceptanceStatusValues.contains(acceptanceStatus)) throw new NoSuchAcceptanceStatusException(NO_SUCH_ACCEPTANCE_STATUS);
        return true;
    }

    public Participant rejectParticipant() {
        this.acceptanceStatus = AcceptanceStatus.REFUSED;
        return this;
    }
}
