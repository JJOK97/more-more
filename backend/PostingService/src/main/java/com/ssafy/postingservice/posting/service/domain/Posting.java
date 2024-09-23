package com.ssafy.postingservice.posting.service.domain;

import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;
import java.util.List;

@Getter
public class Posting {
    private Long postingId;
    private Long memberId;
    private String clubCode;
    private Long accountHistoryId;
    private String postingContent;
    private Timestamp postingCreatedTime;
    private Long commentCount;
    private List<String> imageUrls;

    @Builder
    public Posting(Long postingId, Long memberId, String clubCode, Long accountHistoryId, String postingContent, Timestamp postingCreatedTime, Long commentCount, List<String> imageUrls) {
        this.postingId = postingId;
        this.memberId = memberId;
        this.clubCode = clubCode;
        this.accountHistoryId = accountHistoryId;
        this.postingContent = postingContent;
        this.postingCreatedTime = postingCreatedTime;
        this.commentCount = commentCount;
        this.imageUrls = imageUrls;  // Builder에 이미지 URL 리스트 추가
    }

}
