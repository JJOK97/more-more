package com.ssafy.scheduleservice.schedule.service;

import com.ssafy.scheduleservice.schedule.controller.dto.response.ScheduleResponse;
import com.ssafy.scheduleservice.schedule.service.domain.Schedule;

import java.util.List;

public interface ScheduleService {
    Schedule findSchedule(String clubCode, Long scheduleId);
    List<ScheduleResponse> findAllSchedules(String clubCode);  // 전체 스케줄 조회
    Schedule saveSchedule(Schedule schedule); // 스케줄 생성
    Schedule updateSchedule(Schedule schedule);
    void deleteBySchedule(String clubCode, Long scheduleId);
}

