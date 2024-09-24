package com.ssafy.postingservice.posting.service.domain;


import lombok.Getter;

@Getter
public class PostImage {

    private Long postImageId;
    private String postImageUrl;
    private Long postingId;
}
