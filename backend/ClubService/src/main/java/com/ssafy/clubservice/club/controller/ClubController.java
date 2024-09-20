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
import org.springframework.http.HttpStatus;
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
    @ResponseStatus(HttpStatus.CREATED)
    public ClubCreateResponse createClub(@RequestPart("file") MultipartFile file, @RequestPart("clubCreateRequest") ClubCreateRequest clubCreateRequest) {
        Club club = clubService.createClub(clubObjectMapper.fromCreateRequestToDomain(clubCreateRequest), clubCreateRequest.getCreatorId(), file);
        return clubObjectMapper.fromDomainToCreateResponse(club);
    }


    @GetMapping("/{clubCode}")
    public ClubReadResponse findClub(@PathVariable("clubCode") String clubCode){
        Club club = clubService.findClub(clubCode);
        return clubObjectMapper.fromDomainToReadResponse(club);
    }

    @GetMapping
    public List<ClubReadResponse> findClubs(@RequestParam("memberId") String memberId) {
        List<Club> clubs = clubService.findClubs(memberId);
        return clubObjectMapper.fromDomainToReadResponse(clubs);
    }

    @GetMapping("/{clubCode}/participants")
    public List<ParticipantReadResponse> findParticipants(@PathVariable("clubCode") String clubCode){
        List<Participant> participants = clubService.findParticipants(clubCode);
        return participantObjectMapper.fromDomainToReadResponse(participants);
    }

    @PostMapping("/{clubCode}/participants")
    @ResponseStatus(HttpStatus.CREATED)
    public List<ParticipantCreateResponse> addParticipant(@PathVariable("clubCode") String clubCode,
                                                    @RequestBody List<ParticipantCreateRequest> participantCreateRequestList){
        List<Participant> participants = clubService.addParticipant(clubCode, participantObjectMapper.fromCreateRequestToDomain(participantCreateRequestList));
        return participantObjectMapper.fromDomainToCreateResponse(participants);
    }

    @PutMapping("/{clubCode}")
    public ClubUpdateResponse updateClub(@PathVariable("clubCode") String clubCode, @RequestBody ClubUpdateRequest clubUpdateRequest){
        Club club = clubService.updateClub(clubCode, clubObjectMapper.fromUpdateRequestToDomain(clubUpdateRequest));
        return clubObjectMapper.fromDomainToUpdatesResponse(club);
    }

    @PostMapping("/{clubCode}/image")
    public ClubUpdateImageResponse updateClubImage(@PathVariable("clubCode") String clubCode,
                                                   @RequestPart("file") MultipartFile file){
        return new ClubUpdateImageResponse(clubService.updateClubImage(clubCode, file));
    }

}
