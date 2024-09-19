package com.ssafy.postingservice.posting.controller.dto.request;

import lombok.Data;

@Data
public class CommentUpdateRequest {
    private Long commentId;
    private String commentContent;
}
