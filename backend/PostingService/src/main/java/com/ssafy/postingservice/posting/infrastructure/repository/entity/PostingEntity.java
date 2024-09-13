package com.ssafy.postingservice.posting.infrastructure.repository.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public class PostingEntity {
    private Long postingId;
    private Long memberId;
    private Long accountHistoryId;
    private String clubCode;
    private String postContent;

}
