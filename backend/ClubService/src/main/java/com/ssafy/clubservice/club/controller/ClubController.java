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
        Club club = clubService.create(clubObjectMapper.fromCreateRequestToDomain(clubCreateRequest), clubCreateRequest.getCreatorId(), file);
        return clubObjectMapper.fromDomainToCreateResponse(club);
    }


    @GetMapping("/{clubCode}")
    public ClubReadResponse getClub(@PathVariable("clubCode") String clubCode){
        Club club = clubService.getClub(clubCode);
        return clubObjectMapper.fromDomainToReadResponse(club);
    }

    @GetMapping
    public List<ClubReadResponse> getClubs(@RequestParam("memberId") String memberId) {
        List<Club> clubs = clubService.getClubs(memberId);
        return clubObjectMapper.fromDomainToReadResponse(clubs);
    }

    @GetMapping("/{clubCode}/participants")
    public List<ParticipantReadResponse> getParticipants(@PathVariable("clubCode") String clubCode){
        List<Participant> participants = clubService.getParticipants(clubCode);
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
    public ClubUpdateResponse update(@PathVariable("clubCode") String clubCode, @RequestBody ClubUpdateRequest clubUpdateRequest){
        Club club = clubService.update(clubCode, clubObjectMapper.fromUpdateRequestToDomain(clubUpdateRequest));
        return clubObjectMapper.fromDomainToUpdatesResponse(club);
    }

    @PostMapping("/{clubCode}/image")
    public ClubUpdateImageResponse updateImage(@PathVariable("clubCode") String clubCode,
                                               @RequestPart("file") MultipartFile file){
        return new ClubUpdateImageResponse(clubService.updateImage(clubCode, file));
    }

}
