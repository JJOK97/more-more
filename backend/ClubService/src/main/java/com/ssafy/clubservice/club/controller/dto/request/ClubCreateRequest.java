package com.ssafy.clubservice.club.controller.dto.request;

import lombok.Data;

@Data
public class ClubCreateRequest {
    private String clubImage;
    private Long dues;
    private String clubCode;
    private String clubName;
}
