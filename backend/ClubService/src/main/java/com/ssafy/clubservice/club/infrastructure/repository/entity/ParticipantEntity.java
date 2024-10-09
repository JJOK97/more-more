package com.ssafy.clubservice.club.infrastructure.repository.entity;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
public class ParticipantEntity {
    private Long participantId;
    private String clubCode;
    private String acceptanceStatus;
    private String clubRole;
    private Long userId;
    private LocalDateTime createdDate;

    @Builder
    public ParticipantEntity(Long participantId, String clubCode, String acceptanceStatus, String clubRole, Long userId, LocalDateTime createdDate) {
        this.participantId = participantId;
        this.clubCode = clubCode;
        this.acceptanceStatus = acceptanceStatus;
        this.clubRole = clubRole;
        this.userId = userId;
        this.createdDate = createdDate;
    }
}
