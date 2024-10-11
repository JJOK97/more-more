package com.ssafy.postingservice.posting.controller.dto.request;

import lombok.Data;



@Data
public class CommentCreateRequest {
    private Long postingId;
    private Long memberId;
    private String commentContent;

}


