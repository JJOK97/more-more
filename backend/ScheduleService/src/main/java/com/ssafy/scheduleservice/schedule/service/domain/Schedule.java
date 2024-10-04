package com.ssafy.scheduleservice.schedule.service.domain;

import lombok.*;

@Getter
@Setter
  // 기존 객체에서 빌더 패턴을 이용해 수정할 수 있도록 설정
public class Schedule {
    private Long scheduleId;
    private String clubCode;
    private String event;
    private String date;
    private String time;
    private Long memberId;

    @Builder(toBuilder = true)
    public Schedule(Long scheduleId, String clubCode, String event, String date, String time, Long memberId) {
        this.scheduleId = scheduleId;
        this.clubCode = clubCode;
        this.event = event;
        this.date = date;
        this.time = time;
        this.memberId = memberId;
    }
}