package com.ssafy.clubservice.club.infrastructure.repository;

import com.ssafy.clubservice.club.infrastructure.repository.entity.ParticipantEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ParticipantMybatisMapper {
    void saveAll(List<ParticipantEntity> participantEntity);
}
