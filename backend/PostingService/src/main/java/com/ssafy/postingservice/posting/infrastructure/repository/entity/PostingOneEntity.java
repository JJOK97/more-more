package com.ssafy.postingservice.posting.infrastructure.repository.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.sql.Timestamp;


@Getter
@AllArgsConstructor
public class PostingOneEntity {
    private Long postingId;
    private Long memberId;
    private Long accountHistoryId;
    private String clubCode;
    private String postingContent;
    private Timestamp postingCreatedTime;
}
