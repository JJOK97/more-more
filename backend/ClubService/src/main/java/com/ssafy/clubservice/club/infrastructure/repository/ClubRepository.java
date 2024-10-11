package com.ssafy.clubservice.club.infrastructure.repository;

import com.ssafy.clubservice.club.service.domain.Club;
import com.ssafy.clubservice.club.service.domain.Participant;

import java.util.List;

public interface ClubRepository {
    Club saveClub(Club club);


    Club updateClub(Club club);

    Club findClubByClubCode(String clubCode);

    List<Club> findClubByMemberId(String memberId);

}
