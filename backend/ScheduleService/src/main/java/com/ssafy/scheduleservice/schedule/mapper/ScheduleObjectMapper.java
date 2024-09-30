package com.ssafy.scheduleservice.schedule.mapper;

import com.ssafy.scheduleservice.schedule.controller.dto.request.ScheduleCreateRequest;
import com.ssafy.scheduleservice.schedule.controller.dto.request.ScheduleUpdateRequest;
import com.ssafy.scheduleservice.schedule.controller.dto.response.ScheduleResponse;
import com.ssafy.scheduleservice.schedule.infrastructure.repository.entity.ScheduleEntity;
import com.ssafy.scheduleservice.schedule.service.domain.Schedule;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ScheduleObjectMapper {

        Schedule fromRequestDtoToDomain(ScheduleCreateRequest scheduleCreateRequest);

        Schedule fromEntityToDomain(ScheduleEntity scheduleEntity);

        ScheduleResponse fromDomainToResponseDto(Schedule schedule);

        ScheduleResponse fromEntityToResponseDto(ScheduleEntity scheduleEntity);

        List<ScheduleResponse> fromEntitiesToResponseDtos(List<ScheduleEntity> scheduleEntities);

        @Mapping(source = "event", target = "event")
        @Mapping(source = "date", target = "date")
        @Mapping(source = "time", target = "time")
        Schedule fromCommentUpdateRequestToDomain(ScheduleUpdateRequest scheduleUpdateRequest);

        ScheduleResponse fromDomainToUpdateResponse(Schedule schedule);


        // 수동 매핑 및 ID 생성 로직이 포함된 메서드
        default ScheduleEntity fromDomainToEntity(Schedule schedule) {
                if (schedule.getScheduleId() == null) {
                        return new ScheduleEntity(
                                1L,
                                schedule.getClubCode(),
                                schedule.getEvent(),
                                schedule.getDate(),
                                schedule.getTime(),
                                schedule.getMemberId()
                        );
                } else {
                        return fromDomainToEntity(schedule); // 기본 자동 매핑 메서드 호출
                }
        }
}
