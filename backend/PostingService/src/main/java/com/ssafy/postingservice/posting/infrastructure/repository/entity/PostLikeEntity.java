package com.ssafy.postingservice.posting.infrastructure.repository.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PostLikeEntity {
    private Long postLikeId;
    private Long memberId;
    private Long postingId;
}
