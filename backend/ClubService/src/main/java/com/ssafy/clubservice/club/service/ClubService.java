package com.ssafy.clubservice.club.service;

import com.ssafy.clubservice.club.service.domain.Club;
import org.springframework.web.multipart.MultipartFile;

public interface ClubService {
    public Club create(Club club, MultipartFile file);

    Club update(String clubCode, Club club);

    String updateImage(String clubCode, MultipartFile file);
}
