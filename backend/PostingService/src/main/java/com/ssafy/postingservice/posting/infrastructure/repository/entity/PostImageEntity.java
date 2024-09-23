package com.ssafy.postingservice.posting.infrastructure.repository.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PostImageEntity {
    private Long postImageId;
    private String postImageUrl;
    private Long postingId;

    public PostImageEntity() {
        
    }

    public void setPostImageUrl(String imageUrl) {
        this.postImageUrl = imageUrl;
    }

    public void setPostingId(Long postingId) {
        this.postingId = postingId;
    }
}
