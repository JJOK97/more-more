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
        List<ParticipantEntity> participantEntities = participants
                .stream()
                .map(participantObjectMapper::toEntity)
                .toList();
        participantMybatisMapper.saveAll(participantEntities);
        return
                participantEntities
                        .stream()
                        .map(participantObjectMapper::fromEntity)
                        .toList();
    }
}
