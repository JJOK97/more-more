package com.ssafy.clubservice.club.mapper;

import com.ssafy.clubservice.club.controller.dto.request.ClubCreateRequest;
import com.ssafy.clubservice.club.controller.dto.response.ClubCreateResponse;
import com.ssafy.clubservice.club.infrastructure.repository.entity.ClubEntity;
import com.ssafy.clubservice.club.service.domain.Club;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ClubObjectMapper {
   public ClubEntity toEntity  (Club club);
   public Club toDomain (ClubCreateRequest clubCreateRequest);
   public ClubCreateResponse fromDomain(Club club);
   public Club fromEntity(ClubEntity clubEntity);
}
