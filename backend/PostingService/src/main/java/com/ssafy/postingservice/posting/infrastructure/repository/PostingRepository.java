package com.ssafy.postingservice.posting.infrastructure.repository;
import com.ssafy.postingservice.posting.controller.dto.response.PostingGetAllResponse;
import com.ssafy.postingservice.posting.controller.dto.response.PostingGetResponse;
import com.ssafy.postingservice.posting.service.domain.Posting;

import java.util.List;

public interface PostingRepository {
    Posting save(Posting posting);
    List<Posting> findByClubCode(String clubCode);

    PostingGetResponse findByPostId(Long postingId);
}
