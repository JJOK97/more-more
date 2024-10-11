package com.ssafy.postingservice.posting.infrastructure.repository;
import com.ssafy.postingservice.posting.controller.dto.response.PostingGetAllResponse;
import com.ssafy.postingservice.posting.infrastructure.repository.entity.PostingEntity;
import com.ssafy.postingservice.posting.infrastructure.repository.entity.PostingOneEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PostingMybatisMapper {
    void save(PostingEntity entity);
    List<PostingEntity> findByClubCode(String clubCode);

    PostingEntity findByPostingId(Long postingId);

    void updatePosting(PostingOneEntity postingOneEntity);

    void deleteByPostingId(Long postingId);

    List<PostingEntity> searchPostsByClubCodeAndKeyword(@Param("clubCode") String clubCode, @Param("keyword") String keyword);
}
