package com.ssafy.clubservice.club.mapper;

import com.ssafy.clubservice.club.infrastructure.repository.entity.ParticipantEntity;
import com.ssafy.clubservice.club.service.domain.Participant;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ParticipantObjectMapper {
    ParticipantEntity toEntity(Participant participant);
    Participant fromEntity(ParticipantEntity participantEntity);
}
