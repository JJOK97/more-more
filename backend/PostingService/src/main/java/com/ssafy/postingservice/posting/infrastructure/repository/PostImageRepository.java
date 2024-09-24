package com.ssafy.postingservice.posting.infrastructure.repository;

import com.ssafy.postingservice.posting.infrastructure.repository.entity.PostImageEntity;
import java.util.List;

public interface PostImageRepository {

    void save(PostImageEntity entity);

    List<PostImageEntity> findByPostingId(Long postingId);

    void deleteByPostingIdAndImageUrls(String url);

    void deleteByPostingId(Long postingId);
}
