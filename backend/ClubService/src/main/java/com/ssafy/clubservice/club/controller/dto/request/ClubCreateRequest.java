package com.ssafy.clubservice.club.controller.dto.request;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class ClubCreateRequest {
    private Long dues;
    private String clubCode;
    private String clubName;
    private String clubIntro;
    private Long creatorId;
}
