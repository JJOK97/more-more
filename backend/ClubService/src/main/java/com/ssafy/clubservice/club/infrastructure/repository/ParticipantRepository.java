package com.ssafy.clubservice.club.infrastructure.repository;

import com.ssafy.clubservice.club.service.domain.Participant;

import java.util.List;

public interface ParticipantRepository {
    List<Participant> addAll(List<Participant> participant);

    List<Participant> findInUserId(List<Long> participants);
}
