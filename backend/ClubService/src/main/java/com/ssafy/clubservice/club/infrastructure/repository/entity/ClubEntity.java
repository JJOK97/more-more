package com.ssafy.clubservice.club.infrastructure.repository.entity;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ClubEntity {
    private Long clubId;
    private Long dues;
    private String clubCode;
    private String clubName;
    private String clubIntro;
    private LocalDate createdDate;
    private List<ParticipantEntity> participants;
}
