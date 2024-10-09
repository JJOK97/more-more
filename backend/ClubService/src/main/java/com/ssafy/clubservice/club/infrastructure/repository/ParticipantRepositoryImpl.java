package com.ssafy.clubservice.club.infrastructure.repository;


import com.ssafy.clubservice.club.infrastructure.repository.entity.ParticipantEntity;
import com.ssafy.clubservice.club.mapper.CustomObjectMapper;
import com.ssafy.clubservice.club.service.domain.Participant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ParticipantRepositoryImpl implements ParticipantRepository {
    private final ParticipantMybatisMapper participantMybatisMapper;
    private final CustomObjectMapper customObjectMapper;

    @Override
    public List<Participant> addMember(String clubCode, List<Participant> participants) {
        List<ParticipantEntity> participantEntities = customObjectMapper.fromParticipantDomainsToEntities(participants);
        participantMybatisMapper.saveMembers(participantEntities);
        return findParticipantsInUserId(clubCode, participantEntities.stream().map(ParticipantEntity::getUserId).toList());
    }

    @Override
    public List<Participant> findParticipantsInUserId(String clubCode, List<Long> userId) {
        return customObjectMapper.fromParticipantEntitiesToDomains(participantMybatisMapper.findParticipantsInUserId(clubCode, userId));
    }

    @Override
    public List<Participant> findParticipants(String clubCode) {
        return customObjectMapper.fromParticipantEntitiesToDomains(participantMybatisMapper.findParticipantsInUserId(clubCode, null));
    }

    @Override
    public Participant acceptParticipant(String clubCode, String participantId) {
        participantMybatisMapper.updateAcceptanceStatus(clubCode, participantId);
        return customObjectMapper.fromEntityToDomain(participantMybatisMapper.findByParticipantId(participantId));
    }


}
