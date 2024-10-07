package com.ssafy.postingservice.posting.service.domain;

import lombok.Builder;
import lombok.Getter;
import java.sql.Timestamp;

@Getter
public class Comment {
    private Long commentId;
    private Long postingId;
    private Long memberId;
    private Timestamp commentCreatedTime;
    private String commentContent;


    @Builder
    public Comment(Long commentId, Long postingId, Long memberId, Timestamp commentCreatedTime, String commentContent) {
        this.commentId = commentId;
        this.postingId = postingId;
        this.memberId = memberId;
        this.commentCreatedTime = commentCreatedTime;
        this.commentContent = commentContent;

    }
}
