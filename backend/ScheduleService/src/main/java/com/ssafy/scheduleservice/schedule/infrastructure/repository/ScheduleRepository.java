package com.ssafy.scheduleservice.schedule.infrastructure.repository;

import com.ssafy.scheduleservice.schedule.infrastructure.repository.entity.ScheduleEntity;
import com.ssafy.scheduleservice.schedule.service.domain.Schedule;

import java.util.List;

public interface ScheduleRepository {
    Schedule findByClubCodeAndScheduleId(String clubCode, Long scheduleId);
    List<ScheduleEntity> findAllScheduleEntities(String clubCode);  // 전체 스케줄 조회 메서드
    Schedule save(Schedule schedule);  // 스케줄 저장 메서드
    Schedule update(Schedule schedule);
    void delete(String clubCode, Long scheduleId);
}