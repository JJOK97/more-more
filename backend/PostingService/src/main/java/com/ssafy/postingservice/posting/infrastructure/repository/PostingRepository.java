package com.ssafy.postingservice.posting.infrastructure.repository;
import com.ssafy.postingservice.posting.controller.dto.response.PostingGetAllResponse;
import com.ssafy.postingservice.posting.controller.dto.response.PostingGetResponse;
import com.ssafy.postingservice.posting.infrastructure.repository.entity.PostingEntity;
import com.ssafy.postingservice.posting.service.domain.Posting;

import java.util.List;

public interface PostingRepository {
    Posting save(Posting posting);
    List<Posting> findByClubCode(String clubCode);

    PostingGetResponse findByPostId(Long postingId);

    void updatePosting(PostingGetResponse existingPosting);

    void deleteByPostingId(Long postingId);

    List<Posting> searchPostsByClubCodeAndKeyword(String clubCode, String keyword);
}
