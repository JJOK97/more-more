package com.ssafy.postingservice.posting.controller.dto.request;

import lombok.Data;

@Data
public class PostingImgCreateRequest {
    private String postImageUrl;
    private Long postingId;
}
