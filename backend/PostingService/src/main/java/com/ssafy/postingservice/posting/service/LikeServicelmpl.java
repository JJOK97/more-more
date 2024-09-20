package com.ssafy.postingservice.posting.service;

import com.ssafy.postingservice.posting.controller.dto.request.LikeRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Service
@RequiredArgsConstructor
public class LikeServicelmpl implements LikeService{

    private final String Member_LIKED_KEY_PREFIX = "post:likes:";
    private final StringRedisTemplate redisTemplate;

    @Override
    public Boolean isLike(LikeRequest request) {
        Long postId = request.getPostId();
        Long memberId = request.getMemberId();
        String userLikedKey = Member_LIKED_KEY_PREFIX + postId;

        return redisTemplate.opsForSet().isMember(userLikedKey, memberId.toString());
    }

    @Override
    public String likePost(LikeRequest request) {
        Long postId = request.getPostId();
        Long memberId = request.getMemberId();

        String userLikedKey = Member_LIKED_KEY_PREFIX + postId;

        if (isLike(request)) {
            return "이미 이 게시글에 좋아요를 눌렀습니다.";
        }

        // 사용자 ID를 SET에 추가하고 좋아요 수 증가
        redisTemplate.opsForSet().add(userLikedKey, memberId.toString());



        return "좋아요를 추가했습니다.";
    }

    @Override
    public String unlikePost(LikeRequest request) {
        Long postId= request.getPostId();
        Long memberId = request.getMemberId();
        String userLikedKey = Member_LIKED_KEY_PREFIX + postId;

        if (!isLike(request)) {
            return "좋아요를 누르지 않았습니다";

        }

        redisTemplate.opsForSet().remove(Member_LIKED_KEY_PREFIX + postId, memberId.toString());


        return "좋아요를 취소했습니다";



    }

    @Override
    public Long getLikeCount(Long postId) {

        String userLikedKey = Member_LIKED_KEY_PREFIX + postId;

        // Redis SET의 크기를 가져와 좋아요 수 반환
        Long likeCount = redisTemplate.opsForSet().size(userLikedKey);
        return likeCount != null ? likeCount : 0L;
    }

    @Override
    public List<String> getAllPosts(Long postId) {
        String userLikedKey = Member_LIKED_KEY_PREFIX + postId;

        // Redis SET에서 모든 멤버(사용자 ID)를 가져옴
        Set<String> likedMembers = redisTemplate.opsForSet().members(userLikedKey);

        // Set을 List로 변환
        return new ArrayList<>(likedMembers);
    }
}
