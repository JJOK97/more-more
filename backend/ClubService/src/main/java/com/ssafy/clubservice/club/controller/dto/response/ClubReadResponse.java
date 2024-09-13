package com.ssafy.clubservice.club.controller.dto.response;

import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class ClubReadResponse {
    private Long clubId;
    private String clubImage;
    private Long dues;
    private String clubCode;
    private String clubName;
    private String clubIntro;
    private LocalDate createdDate;
    List<ParticipantReadResponse> participants = new ArrayList<>();
}
