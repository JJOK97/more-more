package com.ssafy.clubservice.club.infrastructure.repository;

import com.ssafy.clubservice.club.infrastructure.repository.entity.ParticipantEntity;
import com.ssafy.clubservice.club.service.domain.Participant;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ParticipantMybatisMapper {
    void saveMembers(List<ParticipantEntity> participantEntity);
    List<ParticipantEntity> findParticipantsInUserId(@Param("clubCode") String clubCode, @Param("userIds") List<Long> userIds);

    void updateAcceptanceStatus(@Param("clubCode")String clubCode, @Param("participantId")String participantId);

    ParticipantEntity findByParticipantId(@Param("participantId")String participantId);

    void removeParticipant(String clubCode, String participantId);
}