package com.ssafy.clubservice.club.controller;

import com.ssafy.clubservice.club.controller.dto.request.ClubCreateRequest;
import com.ssafy.clubservice.club.controller.dto.request.ClubUpdateImageRequest;
import com.ssafy.clubservice.club.controller.dto.request.ClubUpdateRequest;
import com.ssafy.clubservice.club.controller.dto.response.ClubCreateResponse;
import com.ssafy.clubservice.club.controller.dto.response.ClubUpdateImageResponse;
import com.ssafy.clubservice.club.controller.dto.response.ClubUpdateResponse;
import com.ssafy.clubservice.club.mapper.ClubObjectMapper;
import com.ssafy.clubservice.club.service.ClubService;
import com.ssafy.clubservice.club.service.domain.Club;
import lombok.RequiredArgsConstructor;
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
        return clubObjectMapper.toCreateResponse(club);
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
