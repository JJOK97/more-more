package com.ssafy.clubservice.club.infrastructure.repository;

import com.ssafy.clubservice.club.infrastructure.repository.entity.ClubEntity;
import com.ssafy.clubservice.club.mapper.ClubObjectMapper;
import com.ssafy.clubservice.club.service.domain.Club;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ClubRepositoryImpl implements ClubRepository {
    private final ClubMybatisMapper clubMybatisMapper;
    private final ClubObjectMapper clubObjectMapper;
    @Override
    public Club save(Club club) {
        ClubEntity entity = clubObjectMapper.fromDomainToEntity(club);
        clubMybatisMapper.save(entity);
        return clubObjectMapper.fromEntityToDomain(entity);
    }

    @Override
    public Club findById(Long clubId) {
        ClubEntity entity = clubMybatisMapper.findById(clubId);
        return clubObjectMapper.fromEntityToDomain(entity);
    }

    @Override
    public Club update(Club club) {
        ClubEntity entity = clubObjectMapper.fromDomainToEntity(club);
        clubMybatisMapper.update(entity);
        return clubObjectMapper.fromEntityToDomain(entity);
    }

    @Override
    public Club findByClubCode(String clubCode) {
        ClubEntity entity = clubMybatisMapper.findByClubCode(clubCode);
        return clubObjectMapper.fromEntityToDomain(entity);
    }

    @Override
    public Club findWithParticipantsByClubCode(String clubCode) {
        return clubObjectMapper.fromEntityToDomain(clubMybatisMapper.findWithParticipantsByClubCode(clubCode));
    }

    @Override
    public List<Club> findClubByMemberId(String memberId) {
        List<ClubEntity> clubEntities = clubMybatisMapper.findClubByMemberId(memberId);
        return clubObjectMapper.fromEntityToDomain(clubEntities);
    }
}
