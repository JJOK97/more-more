package com.ssafy.postingservice.posting.infrastructure.repository;

import com.ssafy.postingservice.posting.infrastructure.repository.entity.PostImageEntity;

import java.util.Collection;
import java.util.List;

public interface PostImageRepository {

    void save(PostImageEntity entity);

    List<PostImageEntity> findByPostingId(Long postingId);
}
