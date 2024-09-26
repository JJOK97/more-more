package com.ssafy.scheduleservice.schedule.controller.dto.request;

import lombok.Data;

@Data
public class ScheduleCreateRequest {
    private String clubCode;
    private String event;
    private String date;
    private String time;
    private Long memberId;
}
