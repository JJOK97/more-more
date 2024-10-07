package com.ssafy.clubservice.club.infrastructure.repository;


import com.ssafy.clubservice.club.infrastructure.repository.entity.ParticipantEntity;
import com.ssafy.clubservice.club.mapper.ParticipantObjectMapper;
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
    public List<Participant> addMember(String clubCode, List<Participant> participants) {
        List<ParticipantEntity> participantEntities = participantObjectMapper.fromDomainToEntity(participants);
        participantMybatisMapper.saveMembers(participantEntities);
        return findParticipantsInUserId(clubCode, participantEntities.stream().map(ParticipantEntity::getUserId).toList());
    }

    @Override
    public List<Participant> findParticipantsInUserId(String clubCode, List<Long> userId) {
        return participantObjectMapper.fromEntityToDomain(participantMybatisMapper.findParticipantsInUserId(clubCode, userId));
    }

    @Override
    public List<Participant> findParticipants(String clubCode) {
        return participantObjectMapper.fromEntityToDomain(participantMybatisMapper.findParticipantsInUserId(clubCode, null));
    }


}
