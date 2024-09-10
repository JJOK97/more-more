package com.ssafy.clubservice.club.infrastructure.repository;

import com.ssafy.clubservice.club.service.domain.Club;

public interface ClubRepository {
    Club save(Club club);
}
