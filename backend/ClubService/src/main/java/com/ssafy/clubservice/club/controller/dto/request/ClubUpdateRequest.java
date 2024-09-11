package com.ssafy.clubservice.club.controller.dto.request;

import lombok.Data;

@Data
public class ClubUpdateRequest {
    private Long clubId;
    private Long dues;
    private String clubCode;
    private String clubName;
}
