package com.ssafy.clubservice.club.controller.dto.response;

import lombok.Data;

@Data
public class ClubCreateResponse {
    private Long clubId;
    private String clubImage;
    private Long dues;
    private String clubCode;
    private String clubName;
}
