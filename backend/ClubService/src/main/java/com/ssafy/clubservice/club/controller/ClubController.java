package com.ssafy.clubservice.club.controller;

import com.ssafy.clubservice.club.controller.dto.request.ClubCreateRequest;
import com.ssafy.clubservice.club.controller.dto.request.ClubUpdateRequest;
import com.ssafy.clubservice.club.controller.dto.request.ParticipantCreateRequest;
import com.ssafy.clubservice.club.controller.dto.response.*;
import com.ssafy.clubservice.club.mapper.ClubObjectMapper;
import com.ssafy.clubservice.club.mapper.ParticipantObjectMapper;
import com.ssafy.clubservice.club.service.ClubService;
import com.ssafy.clubservice.club.service.domain.Club;
import com.ssafy.clubservice.club.service.domain.Participant;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/club")
public class ClubController {
    private final ClubService clubService;
    private final ClubObjectMapper clubObjectMapper;
    private final ParticipantObjectMapper participantObjectMapper;

    @PostMapping
    public ClubCreateResponse createClub(@RequestPart("file") MultipartFile file, ClubCreateRequest clubCreateRequest) {
        Club club = clubService.create(clubObjectMapper.toDomain(clubCreateRequest), clubCreateRequest.getCreatorId(), file);
        return clubObjectMapper.toCreateResponse(club);
    }


    @GetMapping("/{clubCode}")
    public ClubReadResponse getClub(@PathVariable("clubCode") String clubCode){
        Club club = clubService.get(clubCode);
        return null;
    }

    @PostMapping("/{clubCode}/participants")
    public List<ParticipantCreateResponse> addParticipant(@PathVariable("clubCode") String clubCode,
                                                    @RequestBody List<ParticipantCreateRequest> participantCreateRequestList){
        List<Participant> participants = clubService.addParticipant(clubCode, participantObjectMapper.fromCreateRequestToDomain(participantCreateRequestList));
        return participantObjectMapper.fromDomainToCreateResponse(participants);
    }

    @PutMapping("/{clubCode}")
    public ClubUpdateResponse update(@PathVariable("clubCode") String clubCode, @RequestBody ClubUpdateRequest clubUpdateRequest){
        Club club = clubService.update(clubCode, clubObjectMapper.toDomain(clubUpdateRequest));
        return clubObjectMapper.toUpdatesResponse(club);
    }


    @PutMapping("/{clubCode}/image")
    public ClubUpdateImageResponse updateImage(@PathVariable("clubCode") String clubCode,
                                               @RequestPart("file") MultipartFile file){
        return new ClubUpdateImageResponse(clubService.updateImage(clubCode, file));
    }




}
