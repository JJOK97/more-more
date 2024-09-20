package com.ssafy.clubservice.club.controller.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParticipantCreateRequest {
    @NotBlank(message = "사용자 ID는 필수값입니다.")
    private Long userId;
}
