package com.ssafy.scheduleservice.schedule.controller.dto.request;

import lombok.Data;

@Data
public class ScheduleUpdateRequest {
    private String event;
    private String date;
    private String time;
}
