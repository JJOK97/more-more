package com.ssafy.scheduleservice.schedule.controller;

import com.ssafy.scheduleservice.schedule.controller.dto.request.ScheduleCreateRequest;
import com.ssafy.scheduleservice.schedule.controller.dto.request.ScheduleUpdateRequest;
import com.ssafy.scheduleservice.schedule.controller.dto.response.ScheduleResponse;
import com.ssafy.scheduleservice.schedule.mapper.ScheduleObjectMapper;
import com.ssafy.scheduleservice.schedule.service.ScheduleService;
import com.ssafy.scheduleservice.schedule.service.domain.Schedule;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {
    private final ScheduleService scheduleService;
    private final ScheduleObjectMapper scheduleObjectMapper;

//    @Operation(summary = "스케줄 클럽 코드 및 ID로 조회 API", description = "clubCode와 scheduleId를 통해 해당 스케줄을 조회")
//    @GetMapping("/{clubCode}/{scheduleId}")
//    public ScheduleResponse findScheduleByCodeAndId(@PathVariable String clubCode, @PathVariable Long scheduleId) {
//        Schedule schedule = scheduleService.findSchedule(clubCode, scheduleId);
//        return scheduleObjectMapper.fromDomainToResponseDto(schedule);  // Schedule 객체를 반환
//    }


    @Operation(summary = "모든 스케줄을 클럽 코드로 조회 API", description = "clubCode를 통해 모든 스케줄을 조회")
    @GetMapping("/{clubCode}/all")
    public List<ScheduleResponse> getAllSchedulesByCode(@PathVariable String clubCode) {
        return scheduleService.findAllSchedules(clubCode);
    }


    @Operation(summary = "스케줄 생성 API", description = "새로운 스케줄을 생성한다.")
    @PostMapping
    public ScheduleResponse createSchedule(@RequestBody ScheduleCreateRequest scheduleCreateRequest) {
        Schedule schedule = scheduleObjectMapper.fromCreateRequestToDomain(scheduleCreateRequest);
        Schedule savedSchedule = scheduleService.saveSchedule(schedule);
        return scheduleObjectMapper.fromDomainToResponseDto(savedSchedule);
    }


    // 스케줄 수정 API
    @Operation(summary = "스케줄 수정 API", description = "clubCode와 scheduleId를 통해 해당 스케줄 수정")
    @PutMapping("/{clubCode}/{scheduleId}")
    public ScheduleResponse updateServiceByCodeAndId(@PathVariable String clubCode, @PathVariable Long scheduleId, @RequestBody ScheduleUpdateRequest scheduleUpdateRequest) {
        // 스케줄 ID를 설정하고 나머지 필드를 빌더 패턴을 통해 업데이트
        System.out.println("Updating schedule with event: " + scheduleUpdateRequest.getEvent());

        Schedule schedule = scheduleObjectMapper.fromCommentUpdateRequestToDomain(scheduleUpdateRequest)
                .toBuilder()
                .clubCode(clubCode)
                .scheduleId(scheduleId)
                .build();

        System.out.println("schedule.getEvent() = " + schedule.getEvent());
        Schedule updatedSchedule = scheduleService.updateSchedule(schedule);
        return scheduleObjectMapper.fromDomainToUpdateResponse(updatedSchedule);
    }
    

    // 스케줄 삭제
    @Operation(summary = "스케줄 삭제 API", description = "clubCode와 scheduleId를 통해 해당 스케줄 삭제")
    @DeleteMapping(value = "/{clubCode}/{scheduleId}")
    public Long deleteByScheduleByCodeAndId(@PathVariable String clubCode, @PathVariable Long scheduleId){
        scheduleService.deleteBySchedule(clubCode, scheduleId);
        return scheduleId;
    }


    @Operation(summary = "스케줄 클럽 코드 및 년-달(yyyy-mm)로 조회 API", description = "clubCode와 String 타입 날짜를 통해 해당 스케줄을 조회")
    @GetMapping("/{clubCode}/{date}")
    public List<String> findScheduleByDate(@PathVariable String clubCode, @PathVariable String date) {
        return scheduleService.findSchedulesByClubCodeAndDate(clubCode, date);
    }

    @Operation(summary = "스케줄 클럽 코드 및 년-달(yyyy-mm-dd)로 조회 API", description = "clubCode와 String 타입 날짜타입 통해 해당 스케줄을 조회")
    @GetMapping("/{clubCode}/{date}/daySchedule")
    public List<ScheduleResponse> findScheduleByFullDate(@PathVariable String clubCode, @PathVariable String date) {
        return scheduleService.findSchedulesByClubCodeAndFullDate(clubCode, date);
    }








}
