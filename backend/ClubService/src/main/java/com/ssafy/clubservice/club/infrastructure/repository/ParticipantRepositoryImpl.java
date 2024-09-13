package com.ssafy.clubservice.club.infrastructure.repository;


import com.ssafy.clubservice.club.infrastructure.repository.entity.ClubEntity;
import com.ssafy.clubservice.club.infrastructure.repository.entity.ParticipantEntity;
import com.ssafy.clubservice.club.mapper.ParticipantObjectMapper;
import com.ssafy.clubservice.club.service.domain.Club;
import com.ssafy.clubservice.club.service.domain.Participant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ParticipantRepositoryImpl implements ParticipantRepository {
    private final ParticipantMybatisMapper participantMybatisMapper;
    private final ParticipantObjectMapper participantObjectMapper;

    @Override
    public List<Participant> addAll(String clubCode, List<Participant> participants) {
        List<ParticipantEntity> participantEntities = participantObjectMapper.fromDomainToEntity(participants);
        participantMybatisMapper.saveAll(participantEntities);
        return findInUserIdByParticipants(clubCode, participantEntities.stream().map(ParticipantEntity::getUserId).toList());
    }

    @Override
    public List<Participant> findInUserIdByParticipants(String clubCode, List<Long> userId) {
        return participantObjectMapper.fromEntityToDomain(participantMybatisMapper.findInUserIdByParticipants(clubCode, userId));
    }

    @Override
    public List<Participant> getParticipants(String clubCode) {
        return participantObjectMapper.fromEntityToDomain(participantMybatisMapper.findInUserIdByParticipants(clubCode, null));
    }


}
