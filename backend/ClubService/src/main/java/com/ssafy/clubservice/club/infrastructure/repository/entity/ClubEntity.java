package com.ssafy.clubservice.club.infrastructure.repository.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ClubEntity {
    private Long clubId;
    private Long dues;
    private String clubCode;
    private String clubName;
}
