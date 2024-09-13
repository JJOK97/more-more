package com.ssafy.clubservice.club.infrastructure.repository;

import com.ssafy.clubservice.club.infrastructure.repository.entity.ParticipantEntity;
import com.ssafy.clubservice.club.service.domain.Club;
import com.ssafy.clubservice.club.service.domain.Participant;

import java.util.List;

public interface ParticipantRepository {
    List<Participant> addAll(String clubCode, List<Participant> participant);

    List<Participant> findInUserIdByParticipants(String clubCode, List<Long> userId);

    List<Participant> getParticipants(String clubCode);

}

