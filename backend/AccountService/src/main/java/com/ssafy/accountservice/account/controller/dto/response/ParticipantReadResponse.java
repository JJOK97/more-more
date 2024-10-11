package com.ssafy.accountservice.account.controller.dto.response;


import com.ssafy.accountservice.account.enumeration.AcceptanceStatus;
import com.ssafy.accountservice.account.enumeration.ClubRole;
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
