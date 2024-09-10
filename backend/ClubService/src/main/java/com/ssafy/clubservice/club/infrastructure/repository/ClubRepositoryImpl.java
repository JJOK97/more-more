package com.ssafy.clubservice.club.infrastructure.repository;

import com.ssafy.clubservice.club.infrastructure.repository.entity.ClubEntity;
import com.ssafy.clubservice.club.mapper.ClubObjectMapper;
import com.ssafy.clubservice.club.service.domain.Club;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ClubRepositoryImpl implements ClubRepository {
    private final ClubMybatisMapper clubMybatisMapper;
    private final ClubObjectMapper clubObjectMapper;
    @Override
    public Club save(Club club) {
        ClubEntity entity = clubObjectMapper.toEntity(club);
        clubMybatisMapper.save(entity);
        return clubObjectMapper.fromEntity(entity);
    }
}
