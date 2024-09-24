package com.ssafy.postingservice.posting.controller;


import com.ssafy.postingservice.posting.controller.dto.request.CommentCreateRequest;
import com.ssafy.postingservice.posting.controller.dto.request.CommentUpdateRequest;
import com.ssafy.postingservice.posting.controller.dto.request.LikeRequest;
import com.ssafy.postingservice.posting.controller.dto.request.PostingCreateRequest;
import com.ssafy.postingservice.posting.controller.dto.response.*;
import com.ssafy.postingservice.posting.mapper.CommentObjectMapper;
import com.ssafy.postingservice.posting.mapper.PostingObjectMapper;
import com.ssafy.postingservice.posting.service.CommentService;
import com.ssafy.postingservice.posting.service.LikeService;
import com.ssafy.postingservice.posting.service.PostingService;
import com.ssafy.postingservice.posting.service.domain.Comment;
import com.ssafy.postingservice.posting.service.domain.Posting;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posting")
public class PostingController {
    private final PostingService postingService;
    private final PostingObjectMapper postingObjectMapper;
    private final CommentService commentService;
    private final CommentObjectMapper commentObjectMapper;
    private final LikeService likeService;


    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public PostingCreateResponse create(@ModelAttribute PostingCreateRequest postingCreateRequest) {
        // Posting 객체 생성
        Posting posting = postingService.create(postingObjectMapper.fromCreateRequestToDomain(postingCreateRequest), postingCreateRequest.getFiles());
        return postingObjectMapper.fromDomainToCreateResponse(posting);
    }

    @GetMapping("/{clubCode}/allPostings")
    public List<PostingGetAllResponse> getPostsByClubCode(@PathVariable String clubCode) {
        return postingService.findByClubCode(clubCode);
    }

    @PostMapping("{postingId}/comment")
    public CommentCreateResponse createComment(@PathVariable Long postingId, @RequestBody CommentCreateRequest commentCreateRequest) {
        commentCreateRequest.setPostingId(postingId);

        Comment comment = commentService.createComment(commentObjectMapper.fromCreatRequestToDomain(commentCreateRequest));
        return commentObjectMapper.fromDomainToCreateResponse(comment);
    }

    @GetMapping("/{postingId}/comment")
    public List<CommentFindResponse>getComment(@PathVariable Long postingId) {
        return commentObjectMapper.fromDomainListToFindResponse(commentService.findBypostingId(postingId));
    }

    @DeleteMapping("/comment/{commentId}")
    public Long deleteComment(@PathVariable Long commentId) {
        commentService.deleteByCommentId(commentId);
            return commentId;
    }

    @PutMapping("/comment/{commentId}")
    public CommentUpdateReponse updateComment(@PathVariable Long commentId, @RequestBody CommentUpdateRequest CommentUpdateRequest) {
        CommentUpdateRequest.setCommentId(commentId);
       Comment comment = commentService.updateComment(commentObjectMapper.fromCommentUpdateRequestToDomain(CommentUpdateRequest));
        return commentObjectMapper.fromDomainToUpdateResponse(comment);
    }

    @GetMapping("/{postingId}/like/{memberId}")
    public Boolean isLike(@PathVariable Long postingId, @PathVariable Long memberId) {
        LikeRequest request = new LikeRequest(postingId, memberId);
        return likeService.isLike(request);

    }
    @PostMapping("/{postingId}/like/{memberId}")
    public String likePost(@PathVariable Long postingId, @PathVariable Long memberId) {
        LikeRequest request = new LikeRequest(postingId, memberId);
        return likeService.likePost(request);
    }

    @DeleteMapping("/{postingId}/like/{memberId}")
    public String unlikePost(@PathVariable Long postingId, @PathVariable Long memberId) {
        LikeRequest request = new LikeRequest(postingId, memberId);
        return likeService.unlikePost(request);
    }

    @GetMapping("/{postingId}/likes")
    public Long getLikeCount(@PathVariable Long postingId) {
        return likeService.getLikeCount(postingId);
    }

    @GetMapping("/{postingId}/likedMembers")
    public List<String> getLikedMembers(@PathVariable Long postingId) {
        return likeService.getAllPosts(postingId);
    }

    @GetMapping("/{postingId}/aboutPosting")
    public PostingGetResponse getPostByPostId(@PathVariable Long postingId){
        return postingService.findByPostId(postingId);

    }




}
