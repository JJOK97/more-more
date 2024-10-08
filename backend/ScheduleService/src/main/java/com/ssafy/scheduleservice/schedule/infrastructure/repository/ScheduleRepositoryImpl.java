package com.ssafy.scheduleservice.schedule.infrastructure.repository;

import com.ssafy.scheduleservice.schedule.infrastructure.repository.entity.ScheduleEntity;
import com.ssafy.scheduleservice.schedule.mapper.ScheduleObjectMapper;
import com.ssafy.scheduleservice.schedule.service.domain.Schedule;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ScheduleRepositoryImpl implements ScheduleRepository {
    private final ScheduleMybatisMapper scheduleMybatisMapper;
    private final ScheduleObjectMapper scheduleObjectMapper;

    // 스케줄 ID로 조회
    @Override
    public Schedule findByClubCodeAndScheduleId(String clubCode, Long scheduleId) {
        ScheduleEntity scheduleEntity = scheduleMybatisMapper.findSchedule(clubCode, scheduleId);
        return scheduleObjectMapper.fromEntityToDomain(scheduleEntity);
    }

    // 스케줄 전체 조회
    @Override
    public List<ScheduleEntity> findAllScheduleEntities(String clubCode) {
        return scheduleMybatisMapper.findAllSchedules(clubCode);
    }

    // 스케줄 저장
    @Override
    public Schedule save(Schedule schedule) {
        ScheduleEntity entity = scheduleObjectMapper.fromDomainToEntity(schedule);
        scheduleMybatisMapper.saveSchedule(entity);
        return scheduleObjectMapper.fromEntityToDomain(entity);
    }

    // 스케줄 변경
    @Override
    public Schedule update(Schedule schedule) {
        ScheduleEntity existingEntity = scheduleMybatisMapper.findSchedule(schedule.getClubCode(), schedule.getScheduleId());
        ScheduleEntity updatedEntity = existingEntity.toBuilder()
                .event(schedule.getEvent())  // 수정할 필드만 업데이트
                .date(schedule.getDate())
                .time(schedule.getTime())
                .build();

        scheduleMybatisMapper.updateSchedule(updatedEntity);
        return scheduleObjectMapper.fromEntityToDomain(updatedEntity);
    }

    // 스케줄 삭제
    @Override
    public void delete(String clubCode, Long scheduleId) {
        scheduleMybatisMapper.deleteSchedule(clubCode, scheduleId);
    }

    @Override
    public List<String> findSchedulesByClubCodeAndDate(String clubCode, String date) {
        return scheduleMybatisMapper.findSchedulesByClubCodeAndDate(clubCode, date);
    }

    @Override
    public List<ScheduleEntity> findSchedulesByClubCodeAndFullDate(String clubCode, String date) {
        return scheduleMybatisMapper.findSchedulesByClubCodeAndFullDate(clubCode, date);
    }

}