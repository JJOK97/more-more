package com.ssafy.clubservice.club.infrastructure.repository;

import com.ssafy.clubservice.club.infrastructure.repository.entity.ClubEntity;
import com.ssafy.clubservice.club.service.domain.Club;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ClubMybatisMapper {
    void save(ClubEntity entity);
    ClubEntity findById(Long clubId);
    void update(ClubEntity entity);
    ClubEntity findByClubCode(String clubCode);
}
