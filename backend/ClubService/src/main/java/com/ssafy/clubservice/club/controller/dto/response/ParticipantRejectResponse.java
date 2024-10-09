package com.ssafy.clubservice.club.controller.dto.response;

import lombok.Data;

import java.time.LocalDateTime;


@Data
public class ParticipantRejectResponse {
    private Long participantId;
    private String clubCode;
    private String acceptanceStatus;
    private String clubRole;
    private Long userId;
    private LocalDateTime createdDate;
}
