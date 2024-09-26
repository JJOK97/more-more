package com.ssafy.scheduleservice.schedule.infrastructure.repository;

import com.ssafy.scheduleservice.schedule.infrastructure.repository.entity.ScheduleEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ScheduleMybatisMapper {
    ScheduleEntity findSchedule(@Param("clubCode") String clubCode, @Param("scheduleId") Long scheduleId);
    List<ScheduleEntity> findAllSchedules(String clubCode);  // 전체 스케줄 조회 메서드
    void saveSchedule(ScheduleEntity scheduleEntity);  // 스케줄 저장 메서드
    void updateSchedule(ScheduleEntity scheduleEntity);
    void deleteSchedule(String clubCode, Long scheduleId);
}