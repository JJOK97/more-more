package com.ssafy.postingservice.posting.infrastructure.repository;
import com.ssafy.postingservice.posting.controller.dto.response.PostingGetResponse;
import com.ssafy.postingservice.posting.infrastructure.repository.entity.PostingEntity;
import com.ssafy.postingservice.posting.mapper.PostingObjectMapper;
import com.ssafy.postingservice.posting.service.domain.Posting;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
@RequiredArgsConstructor
public class PostingRepositoryImpl implements PostingRepository {
    private final PostingMybatisMapper postingMybatisMapper;
    private final PostingObjectMapper postingObjectMapper;



    @Override
    public Posting save(Posting posting) {
        PostingEntity entity= postingObjectMapper.fromDomainToEntity(posting);
        postingMybatisMapper.save(entity);
        return postingObjectMapper.fromEntityToDomain(entity);
    }

    @Override
    public List<Posting> findByClubCode(String clubCode) {
        return postingObjectMapper.fromEntitiesToDomainList(postingMybatisMapper.findByClubCode(clubCode));
    }

    @Override
    public PostingGetResponse findByPostId(Long postingId) {

        return postingObjectMapper.fromEntityToPostingGetResponse(postingMybatisMapper.findByPostingId(postingId));
    }

    @Override
    public void updatePosting(PostingGetResponse existingPosting) {
        postingMybatisMapper.updatePosting(postingObjectMapper.fromPostingGetResponseToOneEntity(existingPosting));

    }

    @Override
    public void deleteByPostingId(Long postingId) {
        postingMybatisMapper.deleteByPostingId(postingId);
    }


}
