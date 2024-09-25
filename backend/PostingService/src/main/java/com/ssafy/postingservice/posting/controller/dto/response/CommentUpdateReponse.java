package com.ssafy.postingservice.posting.controller.dto.response;

import lombok.Data;

@Data
public class CommentUpdateReponse {
    private Long commentId;
    private String commentContent;
}
