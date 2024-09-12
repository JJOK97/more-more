package com.ssafy.clubservice.club.service;

import com.ssafy.clubservice.club.service.domain.Club;
import com.ssafy.clubservice.club.service.domain.Participant;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ClubService {
    Club create(Club club, Long creatorId, MultipartFile file);

    Club update(String clubCode, Club club);

    String updateImage(String clubCode, MultipartFile file);

    Club get(String clubCode);

    List<Participant> addParticipant(String clubCode, List<Participant> participants);
}
