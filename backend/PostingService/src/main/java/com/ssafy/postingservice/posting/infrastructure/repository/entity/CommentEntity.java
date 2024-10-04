package com.ssafy.postingservice.posting.infrastructure.repository.entity;

import com.ssafy.postingservice.posting.controller.dto.response.MemberGetResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
@AllArgsConstructor
public class CommentEntity {
    private Long commentId;
    private Long postingId;
    private Long memberId;
    private Timestamp commentCreatedTime;
    private String commentContent;

}
