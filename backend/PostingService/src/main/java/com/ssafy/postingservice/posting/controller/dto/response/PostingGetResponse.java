package com.ssafy.postingservice.posting.controller.dto.response;

import com.ssafy.postingservice.posting.service.domain.Comment;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;


@Data
public class PostingGetResponse {

    private Long postingId;
    private Long memberId;
    private String accountHistoryTag;
    private String clubCode;
    private String postingContent;
    private Timestamp postingCreatedTime;
    private List<CommentFindResponse> comments;
    private List<String> imageUrls;
    private MemberGetResponse memberInfo;

}
