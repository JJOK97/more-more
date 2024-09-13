package com.ssafy.clubservice.club.infrastructure.repository;

import com.ssafy.clubservice.club.service.domain.Club;

import java.util.List;

public interface ClubRepository {
    Club save(Club club);

    Club findById(Long clubId);

    Club update(Club club);

    Club findByClubCode(String clubCode);

    Club findWithParticipantsByClubCode(String clubCode);

    List<Club> findClubByMemberId(String memberId);
}
