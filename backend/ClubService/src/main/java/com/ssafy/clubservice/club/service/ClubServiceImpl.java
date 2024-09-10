package com.ssafy.clubservice.club.service;

import com.ssafy.clubservice.club.infrastructure.repository.ClubRepository;
import com.ssafy.clubservice.club.service.domain.Club;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClubServiceImpl implements ClubService {
    private final ClubRepository clubRepository;
    private final UUIDHolder uuidHolder;
    public Club create(Club club){
        Club generatedClub = club.generateClubCode(uuidHolder);
        return clubRepository.save(generatedClub);
    }
}
