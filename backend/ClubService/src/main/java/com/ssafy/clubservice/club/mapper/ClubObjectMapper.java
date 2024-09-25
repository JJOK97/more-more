package com.ssafy.clubservice.club.mapper;

import com.ssafy.clubservice.club.controller.dto.request.ClubCreateRequest;
import com.ssafy.clubservice.club.controller.dto.request.ClubUpdateRequest;
import com.ssafy.clubservice.club.controller.dto.response.ClubCreateResponse;
import com.ssafy.clubservice.club.controller.dto.response.ClubReadResponse;
import com.ssafy.clubservice.club.controller.dto.response.ClubUpdateResponse;
import com.ssafy.clubservice.club.infrastructure.repository.entity.ClubEntity;
import com.ssafy.clubservice.club.service.domain.Club;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ClubObjectMapper {
   Club fromCreateRequestToDomain (ClubCreateRequest clubCreateRequest);
   ClubEntity fromDomainToEntity  (Club club);
   ClubCreateResponse fromDomainToCreateResponse(Club club);
   Club fromEntityToDomain(ClubEntity clubEntity);
   Club fromUpdateRequestToDomain(ClubUpdateRequest clubUpdateRequest);
   ClubUpdateResponse fromDomainToUpdatesResponse(Club club);
   ClubReadResponse fromDomainToReadResponse(Club club);
   List<Club> fromEntityToDomain(List<ClubEntity> clubEntities);

   List<ClubReadResponse> fromDomainToReadResponse(List<Club> clubs);
}
