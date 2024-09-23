package com.ssafy.postingservice.posting.service;


import com.ssafy.postingservice.posting.controller.dto.response.PostingGetAllResponse;
import com.ssafy.postingservice.posting.controller.dto.response.PostingGetResponse;
import com.ssafy.postingservice.posting.infrastructure.repository.CommentRepository;
import com.ssafy.postingservice.posting.infrastructure.repository.PostImageRepository;
import com.ssafy.postingservice.posting.infrastructure.repository.PostingRepository;
import com.ssafy.postingservice.posting.infrastructure.repository.entity.PostImageEntity;
import com.ssafy.postingservice.posting.infrastructure.s3.S3Connector;
import com.ssafy.postingservice.posting.mapper.PostingObjectMapper;
import com.ssafy.postingservice.posting.service.domain.Comment;
import com.ssafy.postingservice.posting.service.domain.Posting;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostingServiceImpl implements PostingService {
    private final PostingRepository postingRepository;
    private final PostingObjectMapper postingObjectMapper;
    private final LikeService likeService;
    private final S3Connector s3Connector;
    private final PostImageRepository postImageRepository;
    private final CommentRepository commentRepository;


    public Posting create(Posting posting, MultipartFile[] files){
        Posting savedPosting = postingRepository.save(posting);

        // 파일 업로드 및 이미지 엔티티 저장
        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                // 난수를 사용하여 파일 이름 생성 (postingId + UUID)
                String randomString = UUID.randomUUID().toString();  // 난수 생성
                String fileName = savedPosting.getPostingId() + "_" + randomString;

                System.out.println(fileName);

                // S3에 파일 업로드 (파일 이름으로 저장)
                s3Connector.upload(fileName, file);

                // 업로드된 파일의 URL 가져오기
                String imageUrl = s3Connector.getImageURL(fileName);

                // 이미지 엔티티 생성 및 저장
                PostImageEntity postImageEntity = new PostImageEntity();
                postImageEntity.setPostImageUrl(imageUrl);
                postImageEntity.setPostingId(savedPosting.getPostingId());
                postImageRepository.save(postImageEntity);
            }
        }

        return savedPosting;
    }

    @Override
    public List<PostingGetAllResponse> findByClubCode(String clubCode) {
        List<Posting> postings = postingRepository.findByClubCode(clubCode);

        if (postings.isEmpty()) {
            return Collections.emptyList();
        }

        List<Long> postingIds = postings.stream()
                .map(Posting::getPostingId)
                .collect(Collectors.toList());

        Map<Long, Long> likeCounts = likeService.getLikeCountsForPostings(postingIds);

        List<PostingGetAllResponse> postingGetAllResponses = new ArrayList<>();

        for (Posting posting : postings) {
            Long postingId = posting.getPostingId();



            // 각 게시물의 이미지 URL 목록을 가져옵니다.
            List<String> imageUrls = postImageRepository.findByPostingId(postingId)
                    .stream()
                    .map(PostImageEntity::getPostImageUrl)
                    .collect(Collectors.toList());



            // PostingGetAllResponse 객체 생성
            PostingGetAllResponse postingGetAllResponse = postingObjectMapper.fromDomainToPostingGetAllResponse(posting);

            // 좋아요 수 처리
            postingGetAllResponse.setLikeCount(likeCounts.getOrDefault(postingId, 0L));

            // 댓글 수는 이제 posting에서 직접 가져옴
            postingGetAllResponse.setCommentCount(posting.getCommentCount());

            // 이미지 URL 리스트 추가
            postingGetAllResponse.setImageUrls(imageUrls);

            postingGetAllResponses.add(postingGetAllResponse);
        }

        return postingGetAllResponses;
    }

    @Override
    public PostingGetResponse findByPostId(Long postingId) {

        // 각 게시물의 이미지 URL 목록을 가져옵니다.
        List<String> imageUrls = postImageRepository.findByPostingId(postingId)
                .stream()
                .map(PostImageEntity::getPostImageUrl)
                .collect(Collectors.toList());

        PostingGetResponse postingGetResponse = postingRepository.findByPostId(postingId);

        // 이미지 URL 리스트 추가
        postingGetResponse.setImageUrls(imageUrls);
        List<Comment> comments= commentRepository.getComment(postingId);
        postingGetResponse.setComments(comments);

        return postingGetResponse;
    }


}
