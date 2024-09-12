package com.ssafy.clubservice.club.mapper;

import com.ssafy.clubservice.club.controller.dto.request.ParticipantCreateRequest;
import com.ssafy.clubservice.club.controller.dto.response.ParticipantCreateResponse;
import com.ssafy.clubservice.club.infrastructure.repository.entity.ParticipantEntity;
import com.ssafy.clubservice.club.service.domain.Participant;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ParticipantObjectMapper {
    ParticipantEntity fromDomainToEntity(Participant participant);
    List<ParticipantEntity> fromDomainToEntity(List<Participant> participants);
    Participant fromEntityToDomain(ParticipantEntity participantEntity);
    List<Participant> fromEntityToDomain(List<ParticipantEntity> participantEntities);
    List<Participant> fromCreateRequestToDomain(List<ParticipantCreateRequest> participantCreateRequest);
    ParticipantCreateResponse fromDomainToCreateResponse(Participant participant);
    List<ParticipantCreateResponse> fromDomainToCreateResponse(List<Participant> participants);
}
