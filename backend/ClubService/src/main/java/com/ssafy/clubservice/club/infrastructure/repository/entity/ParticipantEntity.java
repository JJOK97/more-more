package com.ssafy.clubservice.club.infrastructure.repository.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@AllArgsConstructor
@Getter
public class ParticipantEntity {
    private Long participantId;
    private Long clubId;
    private String acceptanceStatus;
    private String clubRole;
    private Long userId;
    private LocalDate createdDate;
}
