package com.ssafy.scheduleservice.schedule.service;

import com.ssafy.scheduleservice.schedule.controller.dto.response.ScheduleResponse;
import com.ssafy.scheduleservice.schedule.infrastructure.repository.ScheduleRepository;
import com.ssafy.scheduleservice.schedule.infrastructure.repository.entity.ScheduleEntity;
import com.ssafy.scheduleservice.schedule.mapper.ScheduleObjectMapper;
import com.ssafy.scheduleservice.schedule.service.domain.Schedule;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ScheduleServiceImpl implements ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final ScheduleObjectMapper scheduleObjectMapper;

    @Override
    public Schedule findSchedule(String clubCode, Long scheduleId) {
        return scheduleRepository.findByClubCodeAndScheduleId(clubCode, scheduleId);
    }

    @Override
    public List<ScheduleResponse> findAllSchedules(String clubCode) {
        List<ScheduleEntity> scheduleEntities = scheduleRepository.findAllScheduleEntities(clubCode);
        return scheduleObjectMapper.fromEntitiesToResponseDtos(scheduleEntities);
    }

    @Transactional
    @Override
    public Schedule saveSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }

    @Transactional(readOnly = false)
    @Override
    public Schedule updateSchedule(Schedule schedule) {
        return scheduleRepository.update(schedule);
    }

    @Transactional(readOnly = false)
    @Override
    public void deleteBySchedule(String clubCode, Long scheduleId) {
        scheduleRepository.delete(clubCode, scheduleId);
    }

}