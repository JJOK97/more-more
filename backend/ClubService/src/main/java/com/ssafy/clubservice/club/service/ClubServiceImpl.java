package com.ssafy.clubservice.club.service;

import com.ssafy.clubservice.club.infrastructure.repository.ClubRepository;
import com.ssafy.clubservice.club.service.domain.Club;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClubServiceImpl implements ClubService {
    private final ClubRepository clubRepository;

    public Club create(Club club){
        System.out.println(club.getClubName());
        return clubRepository.save(club);
    }

}
