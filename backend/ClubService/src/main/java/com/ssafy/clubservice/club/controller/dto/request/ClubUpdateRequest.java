package com.ssafy.clubservice.club.controller.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ClubUpdateRequest {
    private Long clubId;
    @Positive(message = "회비는 0원보다 커야합니다.")
    private Long dues;
    @NotBlank(message = "모임 코드는 필수값입니다.")
    private String clubCode;
    private String clubName;
}
