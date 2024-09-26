package com.ssafy.scheduleservice.schedule.infrastructure.repository.entity;

import lombok.*;

@AllArgsConstructor
@Builder(toBuilder = true)
@Getter
@Setter
public class ScheduleEntity {
    private Long scheduleId;
    private String clubCode;
    private String event;
    private String date;
    private String time;
    private Long memberId;
}

