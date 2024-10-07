package com.ssafy.postingservice.posting.controller.dto.response;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class CommentFindResponse {

    private Long commentId;
    private Long postingId;
    private Long memberId;
    private Timestamp commentCreatedTime;
    private String commentContent;



    @Builder
    public CommentFindResponse(Long commentId, Long postingId, Long memberId, Timestamp commentCreatedTime , String commentContent) {
        this.commentId = commentId;
        this.postingId = postingId;
        this.memberId = memberId;
        this.commentCreatedTime = commentCreatedTime;
        this.commentContent = commentContent;



    }
}
