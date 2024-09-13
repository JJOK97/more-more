package com.ssafy.postingservice.posting.service.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Posting {
    private Long postingId;
    private Long memberId;
    private String clubCode;
    private Long accountHistoryId;
    private String postContent;

    @Builder
    public Posting(Long postingId, Long memberId, String clubCode, Long accountHistoryId, String postContent) {
        this.postingId = postingId;
        this.memberId = memberId;
        this.clubCode = clubCode;
        this.accountHistoryId = accountHistoryId;
        this.postContent = postContent;
    }

}
