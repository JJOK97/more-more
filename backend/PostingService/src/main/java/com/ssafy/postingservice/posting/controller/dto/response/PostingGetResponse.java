package com.ssafy.postingservice.posting.controller.dto.response;

import com.ssafy.postingservice.posting.service.domain.Comment;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;


@Data
public class PostingGetResponse {

    private Long postingId;
    private Long memberId;
    private Long accountHistoryId;
    private String clubCode;
    private String postingContent;
    private Timestamp postingCreatedTime;
    private List<Comment> comments;
    private List<String> imageUrls;

}
