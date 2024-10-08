package com.ssafy.clubservice.club.infrastructure.repository;

import com.ssafy.clubservice.club.infrastructure.repository.entity.ClubEntity;
import com.ssafy.clubservice.club.mapper.CustomObjectMapper;
import com.ssafy.clubservice.club.service.domain.Club;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ClubRepositoryImpl implements ClubRepository {
    private final ClubMybatisMapper clubMybatisMapper;
    private final CustomObjectMapper customObjectMapper;
    @Override
    public Club saveClub(Club club) {
        ClubEntity entity = customObjectMapper.fromDomainToEntity(club);
        clubMybatisMapper.saveClub(entity);
        return customObjectMapper.fromEntityToDomain(entity);
    }

    @Override
    public Club updateClub(Club club) {
        System.out.println(club);
        ClubEntity entity = customObjectMapper.fromDomainToEntity(club);
        System.out.println(entity);
        clubMybatisMapper.updateClub(entity);
        return customObjectMapper.fromEntityToDomain(entity);
    }

    @Override
    public Club findClubByClubCode(String clubCode) {
        ClubEntity entity = clubMybatisMapper.findClubByClubCode(clubCode);
        return customObjectMapper.fromEntityToDomain(entity);
    }

    @Override
    public List<Club> findClubByMemberId(String memberId) {
        List<ClubEntity> clubEntities = clubMybatisMapper.findClubByMemberId(memberId);
        return customObjectMapper.fromClubEntitiesToDomains(clubEntities);
    }
}
