package com.ssafy.postingservice.posting.controller.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class PostingUpdateRequest {

    private Long accountHistoryId;
    private String postingContent;
    private MultipartFile[] files;
    private List<String> imageUrls;



}
