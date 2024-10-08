package com.ssafy.clubservice.club.infrastructure.repository.entity;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

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

    @Builder
    public ClubEntity(Long clubId, Long dues, String clubCode, String clubName, String clubIntro, LocalDate createdDate, List<ParticipantEntity> participants) {
        this.clubId = clubId;
        this.dues = dues;
        this.clubCode = clubCode;
        this.clubName = clubName;
        this.clubIntro = clubIntro;
        this.createdDate = createdDate;
        this.participants = participants;
    }
}
