package com.ssafy.clubservice.club.infrastructure.repository;

import com.ssafy.clubservice.club.infrastructure.repository.entity.ParticipantEntity;
import com.ssafy.clubservice.club.service.domain.Participant;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ParticipantMybatisMapper {
    void saveAll(List<ParticipantEntity> participantEntity);
    List<ParticipantEntity> findInUserIdByParticipants(@Param("clubCode") String clubCode, @Param("userIds") List<Long> userIds);
    List<ParticipantEntity> getParticipants(String clubCode);
}