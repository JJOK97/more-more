package com.ssafy.clubservice.club.mapper;

import com.ssafy.clubservice.club.controller.dto.request.ClubCreateRequest;
import com.ssafy.clubservice.club.controller.dto.request.ClubUpdateRequest;
import com.ssafy.clubservice.club.controller.dto.request.ParticipantCreateRequest;
import com.ssafy.clubservice.club.controller.dto.response.*;
import com.ssafy.clubservice.club.infrastructure.repository.entity.ClubEntity;
import com.ssafy.clubservice.club.infrastructure.repository.entity.ParticipantEntity;
import com.ssafy.clubservice.club.service.domain.Club;
import com.ssafy.clubservice.club.service.domain.Participant;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CustomObjectMapper {
   Club fromCreateRequestToDomain (ClubCreateRequest clubCreateRequest);
   ClubEntity fromDomainToEntity(Club club);
   ClubCreateResponse fromDomainToCreateResponse(Club club);
   Club fromEntityToDomain(ClubEntity clubEntity);
   Club fromUpdateRequestToDomain(ClubUpdateRequest clubUpdateRequest);
   ClubUpdateResponse fromDomainToUpdatesResponse(Club club);
   ClubReadResponse fromDomainToReadResponse(Club club);

   List<Club> fromClubEntitiesToDomains(List<ClubEntity> clubEntities);
   List<ClubReadResponse> fromClubDomainsToReadResponses(List<Club> clubs);


   ParticipantEntity fromDomainToEntity(Participant participant);
   List<ParticipantEntity> fromParticipantDomainsToEntities(List<Participant> participants);
   Participant fromEntityToDomain(ParticipantEntity participantEntity);
   List<Participant> fromParticipantEntitiesToDomains(List<ParticipantEntity> participantEntities);
   ParticipantCreateResponse fromDomainToCreateResponse(Participant participant);
   List<Participant> fromCreateRequestToDomain(List<ParticipantCreateRequest> participantCreateRequest);
   List<ParticipantCreateResponse> fromParticipantDomainsToCreateResponses(List<Participant> participants);
   ParticipantReadResponse fromDomainToReadResponse(Participant participant);
   List<ParticipantReadResponse> fromParticipantDomainsToReadResponses(List<Participant> participants);
   ParticipantAcceptResponse fromDomainToAcceptResponse(Participant participant);
}
