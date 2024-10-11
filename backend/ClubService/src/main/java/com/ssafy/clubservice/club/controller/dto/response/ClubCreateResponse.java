package com.ssafy.clubservice.club.controller.dto.response;

import com.ssafy.clubservice.club.service.domain.Participant;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class ClubCreateResponse {
    private Long clubId;
    private String clubImage;
    private Long dues;
    private String clubCode;
    private String clubName;
    private String clubIntro;
    private List<ParticipantCreateResponse> participants;
}

