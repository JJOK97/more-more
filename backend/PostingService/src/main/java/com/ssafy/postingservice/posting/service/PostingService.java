package com.ssafy.postingservice.posting.service;


import com.ssafy.postingservice.posting.controller.dto.request.PostingUpdateRequest;
import com.ssafy.postingservice.posting.controller.dto.response.PostingGetAllResponse;
import com.ssafy.postingservice.posting.controller.dto.response.PostingGetResponse;
import com.ssafy.postingservice.posting.service.domain.Posting;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostingService {
    Posting create(Posting posting, MultipartFile[] files);
    List<PostingGetAllResponse> findByClubCode(String clubCode);

    PostingGetResponse findByPostId(Long postingId);

    PostingGetResponse updatePostingById(Long postingId, PostingUpdateRequest postingUpdateRequest);

    void PostingDeleteByPostId(Long postingId);

    List<PostingGetAllResponse> searchByClubCodeAndKeyword(String clubCode, String keyword);
}
