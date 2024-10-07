package com.ssafy.clubservice.club.infrastructure.repository.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@Getter
public class ClubEntity {
    private Long clubId;
    private Long dues;
    private String clubCode;
    private String clubName;
    private String clubIntro;
    private LocalDate createdDate;
}
