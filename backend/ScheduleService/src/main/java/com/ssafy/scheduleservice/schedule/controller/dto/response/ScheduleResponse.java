package com.ssafy.scheduleservice.schedule.controller.dto.response;

import lombok.Data;

@Data
public class ScheduleResponse {
    private Long scheduleId;
    private String clubCode;
    private String event;
    private String date;
    private String time;
    private Long memberId;
}
