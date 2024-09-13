package com.ssafy.postingservice.posting.infrastructure.repository;
import com.ssafy.postingservice.posting.infrastructure.repository.entity.PostingEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PostingMybatisMapper {
    void save(PostingEntity entity);
    List<PostingEntity> findByClubCode(String clubCode);
}
