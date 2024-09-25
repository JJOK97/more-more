package com.ssafy.clubservice.club.controller.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class ClubCreateRequest {
    @Positive(message = "회비는 0원보다 커야합니다.")
    private Long dues;

    @NotNull(message = "모임 생성자 ID는 필수값입니다.")
    private Long creatorId;

    private String clubName;
    private String clubIntro;
}
