package com.ssafy.clubservice.club.service;

import com.ssafy.clubservice.club.service.domain.Account;
import com.ssafy.clubservice.club.service.domain.Club;
import com.ssafy.clubservice.club.service.domain.Participant;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ClubService {
    Club createClub(Club club, Account account, Long creatorId, MultipartFile file);

    Club updateClub(String clubCode, Club club);

    String updateClubImage(String clubCode, MultipartFile file);

    List<Participant> addParticipant(String clubCode, List<Participant> participants);

    List<Participant> findParticipants(String clubCode);

    Club findClub(String clubCode);

    List<Club> findClubs(String memberId);
}
