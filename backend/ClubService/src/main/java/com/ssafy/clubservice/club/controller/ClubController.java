package com.ssafy.clubservice.club.controller;

import com.ssafy.clubservice.club.controller.dto.request.ClubCreateRequest;
import com.ssafy.clubservice.club.controller.dto.request.ClubUpdateRequest;
import com.ssafy.clubservice.club.controller.dto.request.ParticipantCreateRequest;
import com.ssafy.clubservice.club.controller.dto.response.*;
import com.ssafy.clubservice.club.mapper.CustomObjectMapper;
import com.ssafy.clubservice.club.service.ClubService;
import com.ssafy.clubservice.club.service.domain.Account;
import com.ssafy.clubservice.club.service.domain.Club;
import com.ssafy.clubservice.club.service.domain.Participant;
import com.ssafy.clubservice.global.validator.ParticipantListValid;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/club")
@Tag(name = "Club", description = "모임 서비스 API")
@Slf4j
public class ClubController {
    private final ClubService clubService;
    private final CustomObjectMapper customObjectMapper;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "모임 생성 API", description = "이미지, 생성자ID, 회비, 모임 이름, 모임 소개글을 입력하여 모임을 생성한다. (access token)")
    public ClubCreateResponse createClub(@RequestPart("file") MultipartFile file, @Valid @RequestPart("clubCreateRequest") ClubCreateRequest clubCreateRequest) {
        log.info("모임 생성 API");
        Club club = clubService.createClub(
                customObjectMapper.fromCreateRequestToDomain(clubCreateRequest),
                new Account(clubCreateRequest.getSsafyUserKey(), clubCreateRequest.getAccountPwd()),
                clubCreateRequest.getCreatorId(), file);
        log.info("모임 생성 API -> {}", club.getClubCode());
        return customObjectMapper.fromDomainToCreateResponse(club);
    }


    @GetMapping("/{clubCode}")
    @Operation(summary = "모임 조회 API", description = "모임 코드에 해당하는 모임을 조회한다. (access token)")
    public ClubReadResponse findClub(@PathVariable("clubCode") String clubCode){
        log.info("모임 조회 API");
        Club club = clubService.findClub(clubCode);
        return customObjectMapper.fromDomainToReadResponse(club);
    }

    @GetMapping
    @Operation(summary = "전체 모임 조회 API", description = "유저ID를 기반으로 해당하는 모임을 조회한다. (access token)")
    public List<ClubReadResponse> findClubs(@RequestParam("memberId") String memberId) {
        log.info("전체 모임 조회 API");
        List<Club> clubs = clubService.findClubs(memberId);
        return customObjectMapper.fromClubDomainsToReadResponses(clubs);
    }

    @PutMapping("/{clubCode}")
    @Operation(summary = "모임 이름 / 회비 수정 API", description = "회비, 모임 이름을 입력하여 모임 코드에 해당하는 모임의 이름과 회비를 수정한다. (access token)")
    public ClubUpdateResponse updateClub(@PathVariable("clubCode") String clubCode, @Valid @RequestBody ClubUpdateRequest clubUpdateRequest){
        log.info("모임 이름 / 회비 수정 API");
        Club club = clubService.updateClub(clubCode, customObjectMapper.fromUpdateRequestToDomain(clubUpdateRequest));
        return customObjectMapper.fromDomainToUpdatesResponse(club);
    }

    @PostMapping("/{clubCode}/image")
    @Operation(summary = "모임 이미지 수정 API", description = "모임 이미지를 입력하여 모임 코드에 해당하는 모임의 이미지를 수정한다. (access token)")
    public ClubUpdateImageResponse updateClubImage(@PathVariable("clubCode") String clubCode,
                                                   @RequestPart("file") MultipartFile file){
        log.info("모임 이미지 수정 API");
        return new ClubUpdateImageResponse(clubService.updateClubImage(clubCode, file));
    }

    @PostMapping("/{clubCode}/participants")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "참석자 등록 API", description = "모임 코드에 해당하는 모임에 참석자를 등록한다. (access token)")
    public List<ParticipantCreateResponse> addParticipant(@PathVariable("clubCode") String clubCode,
                                                          @ParticipantListValid @RequestBody List<ParticipantCreateRequest> participantCreateRequestList){
        log.info("참석자 등록 API");
        List<Participant> participants = clubService.addParticipant(clubCode, customObjectMapper.fromCreateRequestToDomain(participantCreateRequestList));
        return customObjectMapper.fromParticipantDomainsToCreateResponses(participants);
    }

    @GetMapping("/{clubCode}/participants")
    @Operation(summary = "참석자 조회 API", description = "모임 코드에 해당하는 모임의 모든 참석자를 조회한다. (access token)")
    public List<ParticipantReadResponse> findParticipants(@PathVariable("clubCode") String clubCode){
        log.info("참석자 조회 API");
        List<Participant> participants = clubService.findParticipants(clubCode);
        return customObjectMapper.fromParticipantDomainsToReadResponses(participants);
    }


}
