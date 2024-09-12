package com.ssafy.clubservice.club.infrastructure.repository.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class ParticipantEntity {
    private Long participantId;
    private String clubCode;
    private String acceptanceStatus;
    private String clubRole;
    private Long userId;
    private LocalDateTime createdDate;
}
