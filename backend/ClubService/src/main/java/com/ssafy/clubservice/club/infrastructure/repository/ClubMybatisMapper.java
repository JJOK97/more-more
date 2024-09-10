package com.ssafy.clubservice.club.infrastructure.repository;

import com.ssafy.clubservice.club.infrastructure.repository.entity.ClubEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ClubMybatisMapper {

    void save(ClubEntity from);
}
