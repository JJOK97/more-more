package com.ssafy.clubservice.club.service;

import com.ssafy.clubservice.club.infrastructure.repository.ClubRepository;
import com.ssafy.clubservice.club.infrastructure.repository.ParticipantRepository;
import com.ssafy.clubservice.club.infrastructure.s3.S3Connector;
import com.ssafy.clubservice.club.service.domain.Club;
import com.ssafy.clubservice.club.service.domain.Participant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ClubServiceImpl implements ClubService {
    private final ClubRepository clubRepository;
    private final ParticipantRepository participantRepository;
    private final S3Connector s3Connector;
    private final UUIDHolder uuidHolder;

    @Override
    @Transactional
    public Club create(Club club, Long creatorId, MultipartFile file){
        club = club.generateClubCode(uuidHolder);
        club = club.addCreator(creatorId);
//        s3Connector.upload(club.getClubCode(), file);
        String imageURL = s3Connector.getImageURL(club.getClubCode());
        List<Participant> participants = participantRepository.addAll(club.getClubCode(), club.getParticipants());
        club = clubRepository.save(club);
        club = club.changeImageName(imageURL);
        club = club.changeParticipant(participants);
        return club;
    }

    @Override
    @Transactional
    public Club update(String clubCode, Club club) {
        Club findClub = clubRepository.findByClubCode(clubCode);
        findClub.update(club);
        return clubRepository.update(findClub);
    }

    @Override
    public String updateImage(String clubCode, MultipartFile file) {
        s3Connector.upload(clubCode, file);
        return s3Connector.getImageURL(clubCode);
    }

    @Override
    public Club getClub(String clubCode) {
        Club club = clubRepository.findByClubCode(clubCode);
        club.changeImageName(s3Connector.getImageURL(clubCode));
        club.changeParticipant(participantRepository.getParticipants(clubCode));
        return club;
    }

    @Override
    public List<Club> getClubs(String memberId) {
        return clubRepository.findClubByMemberId(memberId);
    }


    @Override
    public List<Participant> addParticipant(String clubCode, List<Participant> participants) {
        return participantRepository.addAll(clubCode, participants
                .stream()
                .map(participant -> Participant.createClubParticipant(clubCode, participant.getUserId()))
                .toList()
        );
    }

    @Override
    public List<Participant> getParticipants(String clubCode) {
        return participantRepository.getParticipants(clubCode);
    }

}
