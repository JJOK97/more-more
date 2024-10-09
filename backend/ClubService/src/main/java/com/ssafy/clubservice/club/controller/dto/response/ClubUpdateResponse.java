package com.ssafy.clubservice.club.controller.dto.response;


import lombok.Data;
import org.w3c.dom.stylesheets.LinkStyle;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class ClubUpdateResponse {
    private Long clubId;
    private String clubImage;
    private Long dues;
    private String clubCode;
    private String clubName;
    private String clubIntro;
    private List<ParticipantUpdateResponse> participants = new ArrayList<>();
    private LocalDate createdDate;
}
