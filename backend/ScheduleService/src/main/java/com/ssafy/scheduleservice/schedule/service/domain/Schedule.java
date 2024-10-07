package com.ssafy.scheduleservice.schedule.service.domain;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)  // 기존 객체에서 빌더 패턴을 이용해 수정할 수 있도록 설정
@Getter
@Setter
public class Schedule {
    private Long scheduleId;
    private String clubCode;
    private String event;
    private String date;
    private String time;
    private Long memberId;
}