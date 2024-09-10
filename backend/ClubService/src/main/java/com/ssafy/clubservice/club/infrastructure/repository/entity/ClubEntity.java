package com.ssafy.clubservice.club.infrastructure.repository.entity;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ClubEntity {
    private Long clubId;
    private String clubImage;
    private Long dues;
    private String clubCode;
    private String clubName;
}
