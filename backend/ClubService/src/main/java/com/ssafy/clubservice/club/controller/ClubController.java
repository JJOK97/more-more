package com.ssafy.clubservice.club.controller;

import com.ssafy.clubservice.club.controller.dto.request.ClubCreateRequest;
import com.ssafy.clubservice.club.controller.dto.response.ClubCreateResponse;
import com.ssafy.clubservice.club.mapper.ClubObjectMapper;
import com.ssafy.clubservice.club.service.ClubService;
import com.ssafy.clubservice.club.service.domain.Club;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/club")
public class ClubController {
    private final ClubService clubService;
    private final ClubObjectMapper clubObjectMapper;

    @PostMapping
    public ClubCreateResponse create(@RequestPart("file") MultipartFile file, ClubCreateRequest clubCreateRequest) {
        Club club = clubService.create(clubObjectMapper.toDomain(clubCreateRequest), file);
        return clubObjectMapper.fromDomain(club);
    }

    

}
