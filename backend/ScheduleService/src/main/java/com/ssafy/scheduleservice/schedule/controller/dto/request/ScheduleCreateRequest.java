package com.ssafy.scheduleservice.schedule.controller.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ScheduleCreateRequest {
    private String clubCode;
    private String event;
    private String date;
    private String time;
    private Long memberId;
}
