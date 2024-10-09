package com.ssafy.scheduleservice.schedule.controller.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ScheduleUpdateRequest {
    private String event;
    private String date;
    private String time;
}
