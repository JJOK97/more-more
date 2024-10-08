package com.ssafy.scheduleservice.schedule.mapper;

import com.ssafy.scheduleservice.schedule.controller.dto.request.ScheduleCreateRequest;
import com.ssafy.scheduleservice.schedule.controller.dto.request.ScheduleUpdateRequest;
import com.ssafy.scheduleservice.schedule.controller.dto.response.ScheduleResponse;
import com.ssafy.scheduleservice.schedule.infrastructure.repository.entity.ScheduleEntity;
import com.ssafy.scheduleservice.schedule.service.domain.Schedule;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ScheduleObjectMapper {
        Schedule fromCreateRequestToDomain(ScheduleCreateRequest scheduleCreateRequest);
        Schedule fromEntityToDomain(ScheduleEntity scheduleEntity);

        ScheduleResponse fromDomainToResponseDto(Schedule schedule);

        ScheduleResponse fromEntityToResponseDto(ScheduleEntity scheduleEntity);

        List<ScheduleResponse> fromEntitiesToResponseDtos(List<ScheduleEntity> scheduleEntities);


        ScheduleResponse fromDomainToUpdateResponse(Schedule schedule);


        Schedule fromCommentUpdateRequestToDomain(ScheduleUpdateRequest scheduleUpdateRequest);

        // 수동 매핑 및 ID 생성 로직이 포함된 메서드
         ScheduleEntity fromDomainToEntity(Schedule schedule) ;





}
