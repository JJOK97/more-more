package com.ssafy.postingservice.posting.controller.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PostingCreateRequest {
    private Long memberId;
    private String clubCode;
    private Long accountHistoryId;
    private String postingContent;
    private MultipartFile[] files;
}
