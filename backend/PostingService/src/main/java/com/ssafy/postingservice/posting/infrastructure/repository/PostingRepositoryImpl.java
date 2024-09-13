package com.ssafy.postingservice.posting.infrastructure.repository;
import com.ssafy.postingservice.posting.infrastructure.repository.entity.PostingEntity;
import com.ssafy.postingservice.posting.mapper.PostingObjectMapper;
import com.ssafy.postingservice.posting.service.domain.Posting;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;


@Repository
@RequiredArgsConstructor
public class PostingRepositoryImpl implements PostingRepository {
    private final PostingMybatisMapper postingMybatisMapper;
    private final PostingObjectMapper postingObjectMapper;
    @Override
    public Posting save(Posting posting) {
        PostingEntity entity= postingObjectMapper.toEntity(posting);
        postingMybatisMapper.save(entity);
        return postingObjectMapper.fromEntity(entity);
    }

    @Override
    public List<Posting> findByClubCode(String clubCode) {
        List<PostingEntity> postingEntities = postingMybatisMapper.findByClubCode(clubCode);
        List<Posting> postings = new ArrayList<>();
        for (PostingEntity postingEntity : postingEntities) {
            postings.add(postingObjectMapper.to(postingEntity));
        }
        return postings;
    }


}
