package com.ssafy.clubservice.club.service;

import com.ssafy.clubservice.club.infrastructure.repository.ClubRepository;
import com.ssafy.clubservice.club.infrastructure.s3.S3Connector;
import com.ssafy.clubservice.club.service.domain.Club;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;

@Service
@RequiredArgsConstructor
public class ClubServiceImpl implements ClubService {
    private final ClubRepository clubRepository;
    private final S3Connector s3Connector;
    private final UUIDHolder uuidHolder;
    public Club create(Club club, MultipartFile file){
        Club generatedClub = club.generateClubCode(uuidHolder);
        s3Connector.upload(generatedClub.getClubCode(), file);
        Club clubWithId = clubRepository.save(club);
        String imageURL = s3Connector.getImageURL(generatedClub.getClubCode());
        clubWithId.changeImageName(imageURL);
        return clubWithId;
    }
}
