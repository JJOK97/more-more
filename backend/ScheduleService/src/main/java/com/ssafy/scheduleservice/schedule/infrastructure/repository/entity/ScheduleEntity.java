package com.ssafy.scheduleservice.schedule.infrastructure.repository.entity;

import lombok.*;


@Getter
@Setter
public class ScheduleEntity {
    private Long scheduleId;
    private String clubCode;
    private String event;
    private String date;
    private String time;
    private Long memberId;
    @Builder(toBuilder = true)
    public ScheduleEntity(Long scheduleId, String clubCode, String event, String date, String time, Long memberId) {
        this.scheduleId = scheduleId;
        this.clubCode = clubCode;
        this.event = event;
        this.date = date;
        this.time = time;
        this.memberId = memberId;
    }
}

