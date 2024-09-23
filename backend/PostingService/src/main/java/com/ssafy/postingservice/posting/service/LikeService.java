package com.ssafy.postingservice.posting.service;


import com.ssafy.postingservice.posting.controller.dto.request.LikeRequest;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Map;


@Service
public interface LikeService {


    Boolean isLike(LikeRequest likeRequest);
    String likePost(LikeRequest request);
    String unlikePost(LikeRequest request);
    Long getLikeCount(Long postId);
    List<String> getAllPosts(Long postId);

    Map<Long, Long> getLikeCountsForPostings(List<Long> postingIds);
}
