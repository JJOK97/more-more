package com.ssafy.clubservice.club.controller.dto.response;

import com.ssafy.clubservice.club.enumeration.AcceptanceStatus;
import com.ssafy.clubservice.club.enumeration.ClubRole;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@ToString
public class ParticipantReadResponse {
    private Long participantId;
    private String clubCode;
    private Long userId;
    private ClubRole clubRole;
    private AcceptanceStatus acceptanceStatus;
    private LocalDateTime createdDate;
}
