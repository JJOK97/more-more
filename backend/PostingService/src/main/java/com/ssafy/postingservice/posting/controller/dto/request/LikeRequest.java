package com.ssafy.postingservice.posting.controller.dto.request;

import lombok.Data;

@Data
public class LikeRequest {

    private Long postId;
    private Long memberId;

    public LikeRequest(Long postId, Long memberId) {
        this.postId = postId;
        this.memberId = memberId;
    }
}
