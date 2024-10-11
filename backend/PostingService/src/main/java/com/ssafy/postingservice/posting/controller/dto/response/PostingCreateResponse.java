package com.ssafy.postingservice.posting.controller.dto.response;

import lombok.Data;


@Data
public class PostingCreateResponse {
    private Long postingId;
    private Long memberId;
    private String clubCode;
    private String accountHistoryTag;
    private String postingContent;


}
