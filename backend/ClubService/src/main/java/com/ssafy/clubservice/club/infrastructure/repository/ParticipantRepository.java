package com.ssafy.clubservice.club.infrastructure.repository;

import com.ssafy.clubservice.club.service.domain.Participant;

import java.util.List;

public interface ParticipantRepository {
    List<Participant> addMember(String clubCode, List<Participant> participant);

    List<Participant> findParticipantsInUserId(String clubCode, List<Long> userId);

    List<Participant> findParticipants(String clubCode);

    Participant acceptParticipant(String clubCode, String participantId);

    Participant rejectParticipant(String clubCode, String participantId);
}

