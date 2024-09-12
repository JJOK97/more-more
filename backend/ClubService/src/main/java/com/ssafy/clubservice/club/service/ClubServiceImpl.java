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
import software.amazon.awssdk.services.s3.S3Client;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ClubServiceImpl implements ClubService {
    private final ClubRepository clubRepository;
    private final ParticipantRepository participantRepository;
    private final S3Connector s3Connector;
    private final UUIDHolder uuidHolder;

    @Override
    public Club create(Club club, Long creatorId, MultipartFile file){
        club = club.generateClubCode(uuidHolder);
        club = club.addCreator(creatorId);
//        s3Connector.upload(club.getClubCode(), file);
        String imageURL = s3Connector.getImageURL(club.getClubCode());
        participantRepository.addAll(club.getParticipants());
        club = clubRepository.save(club);
        club.changeImageName(imageURL);
        return club;
    }

    @Override
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
    public Club get(String clubCode) {
        return clubRepository.findWithParticipantsByClubCode(clubCode);
    }

    @Override
    public List<Participant> addParticipant(String clubCode, List<Participant> participants) {
        return participantRepository.addAll(participants
                .stream()
                .map(participant -> Participant.createClubParticipant(clubCode, participant.getUserId()))
                .toList()
        );
    }

}
