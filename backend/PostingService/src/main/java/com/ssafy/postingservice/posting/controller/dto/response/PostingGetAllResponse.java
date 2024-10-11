package com.ssafy.postingservice.posting.controller.dto.response;

import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
public class PostingGetAllResponse {
    private Long postingId;
    private Long memberId;
    private String clubCode;
    private String accountHistoryTag;
    private String postingContent;
    private Timestamp postingCreatedTime;
    private Long commentCount;
    private Long likeCount;
    private List<String> imageUrls;
    private MemberGetResponse memberInfo;
}
