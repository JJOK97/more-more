package com.ssafy.clubservice.club.infrastructure.repository;

import com.ssafy.clubservice.club.infrastructure.repository.entity.ParticipantEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ParticipantMybatisMapper {
    void saveMembers(List<ParticipantEntity> participantEntity);
    List<ParticipantEntity> findParticipantsInUserId(@Param("clubCode") String clubCode, @Param("userIds") List<Long> userIds);
}