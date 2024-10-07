package com.ssafy.postingservice.posting.infrastructure.repository;
import com.ssafy.postingservice.posting.infrastructure.repository.entity.PostImageEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface PostingImageMybatisMapper {
    void savePostingImage(PostImageEntity entity);
    List<PostImageEntity> findByPostingId(Long postingId);

    void deleteByPostingIdAndImageUrls(String url);

    void deleteByPostingId(Long postingId);
}
