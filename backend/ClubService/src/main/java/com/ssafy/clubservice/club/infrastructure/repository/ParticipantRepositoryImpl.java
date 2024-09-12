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
    public List<Participant> addAll(List<Participant> participants) {
        List<ParticipantEntity> participantEntities = participantObjectMapper.fromDomainToEntity(participants);
        participantMybatisMapper.saveAll(participantEntities);
        return findInUserId(participants.stream().map(Participant::getUserId).toList());
    }

    @Override
    public List<Participant> findInUserId(List<Long> userIdList) {
        return participantObjectMapper.fromEntityToDomain(participantMybatisMapper.findInUserId(userIdList));
    }
}
