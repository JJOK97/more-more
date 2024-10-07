package com.ssafy.clubservice.club.infrastructure.repository;

import com.ssafy.clubservice.club.infrastructure.repository.entity.ClubEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ClubMybatisMapper {
    void saveClub(ClubEntity entity);
    void updateClub(ClubEntity entity);
    ClubEntity findClubByClubCode(String clubCode);
    List<ClubEntity> findClubByMemberId(String memberId);
}
