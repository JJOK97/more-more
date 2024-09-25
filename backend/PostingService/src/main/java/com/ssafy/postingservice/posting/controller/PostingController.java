package com.ssafy.postingservice.posting.controller;


import com.ssafy.postingservice.posting.controller.dto.request.*;
import com.ssafy.postingservice.posting.controller.dto.response.*;
import com.ssafy.postingservice.posting.mapper.CommentObjectMapper;
import com.ssafy.postingservice.posting.mapper.PostingObjectMapper;
import com.ssafy.postingservice.posting.service.CommentService;
import com.ssafy.postingservice.posting.service.LikeService;
import com.ssafy.postingservice.posting.service.PostingService;
import com.ssafy.postingservice.posting.service.domain.Comment;
import com.ssafy.postingservice.posting.service.domain.Posting;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posting")
@Tag(name = "Posting", description = "게시판 서비스 API")
public class PostingController {
    private final PostingService postingService;
    private final PostingObjectMapper postingObjectMapper;
    private final CommentService commentService;
    private final CommentObjectMapper commentObjectMapper;
    private final LikeService likeService;


    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "게시글 생성 API", description = "이미지들, 생성자ID, clubcode, 계좌내역, 게시글 내용을 입력하여 게시글을 생성한다. (access token)")
    public PostingCreateResponse create(@ModelAttribute PostingCreateRequest postingCreateRequest) {
        // Posting 객체 생성
        Posting posting = postingService.create(postingObjectMapper.fromCreateRequestToDomain(postingCreateRequest), postingCreateRequest.getFiles());
        return postingObjectMapper.fromDomainToCreateResponse(posting);
    }

    @Operation(summary = "모든 게시글 조회 API", description = "클럽코드를 입력하여 게시글을 조회한다. (access token)")
    @GetMapping("/{clubCode}/allPostings")
    public List<PostingGetAllResponse> getPostsByClubCode(@PathVariable String clubCode) {
        return postingService.findByClubCode(clubCode);
    }


    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "댓글 생성 API", description = "맴버id, postingid, 댓글 내용을 입력하여 댓글을 생성한다. (access token)")
    @PostMapping("{postingId}/comment")
    public CommentCreateResponse createComment(@PathVariable Long postingId, @RequestBody CommentCreateRequest commentCreateRequest) {
        commentCreateRequest.setPostingId(postingId);

        Comment comment = commentService.createComment(commentObjectMapper.fromCreatRequestToDomain(commentCreateRequest));
        return commentObjectMapper.fromDomainToCreateResponse(comment);
    }
    @Operation(summary = "댓글 조회 API", description = "postingid를 통해 해당 게시글에 있는 댓글만 조회 (access token)")
    @GetMapping("/{postingId}/comment")
    public List<CommentFindResponse>getComment(@PathVariable Long postingId) {
        return commentObjectMapper.fromDomainListToFindResponse(commentService.findBypostingId(postingId));
    }
    @Operation(summary = "댓글 삭제 API", description = "commentid를 통해 해당 댓글 삭제 (access token)")
    @DeleteMapping("/comment/{commentId}")
    public Long deleteComment(@PathVariable Long commentId) {
        commentService.deleteByCommentId(commentId);
            return commentId;
    }
    @Operation(summary = "댓글 수정 API", description = "commentid, comment내용을 통해 해당 댓글 수정 (access token)")
    @PutMapping("/comment/{commentId}")
    public CommentUpdateReponse updateComment(@PathVariable Long commentId, @RequestBody CommentUpdateRequest CommentUpdateRequest) {
        CommentUpdateRequest.setCommentId(commentId);
       Comment comment = commentService.updateComment(commentObjectMapper.fromCommentUpdateRequestToDomain(CommentUpdateRequest));
        return commentObjectMapper.fromDomainToUpdateResponse(comment);
    }

    @Operation(summary = "좋아요 조회 API", description = "postingId와 merberId를 통해 해당 댓글에 좋아요를 눌럿는지 확인 (access token)")
    @GetMapping("/{postingId}/like/{memberId}")
    public Boolean isLike(@PathVariable Long postingId, @PathVariable Long memberId) {
        LikeRequest request = new LikeRequest(postingId, memberId);
        return likeService.isLike(request);

    }

    @Operation(summary = "좋아요 생성 API", description = "postingId와 merberId를 통해 해당 게시글에 좋아요를 누른적 없으면 좋아요 생성 (access token)")
    @PostMapping("/{postingId}/like/{memberId}")
    public String likePost(@PathVariable Long postingId, @PathVariable Long memberId) {
        LikeRequest request = new LikeRequest(postingId, memberId);
        return likeService.likePost(request);
    }
    @Operation(summary = "좋아요 삭제 API", description = "postingId와 merberId를 통해 해당 게시글에 좋아요를 누른적 있으면 좋아요 삭제 (access token)")
    @DeleteMapping("/{postingId}/like/{memberId}")
    public String unlikePost(@PathVariable Long postingId, @PathVariable Long memberId) {
        LikeRequest request = new LikeRequest(postingId, memberId);
        return likeService.unlikePost(request);
    }
    @Operation(summary = "게시글에 관한 좋아요 갯수 조회 API", description = "postingId를 통해 해당 게시글의 좋아요 갯수 조회 (access token)")
    @GetMapping("/{postingId}/likes")
    public Long getLikeCount(@PathVariable Long postingId) {
        return likeService.getLikeCount(postingId);
    }


    @Operation(summary = "게시글에 좋아요 누른사람들 조회 API", description = "postingId를 통해 해당 게시글에 좋아요 누른 사람 조회 (access token)")
    @GetMapping("/{postingId}/likedMembers")
    public List<String> getLikedMembers(@PathVariable Long postingId) {
        return likeService.getAllPosts(postingId);
    }


    @Operation(summary = "게시글 상세 조회 API", description = "postingId를 통해 게시글 상세 조회 (access token)")
    @GetMapping("/{postingId}/aboutPosting")
    public PostingGetResponse getPostByPostId(@PathVariable Long postingId){
        return postingService.findByPostId(postingId);

    }

    @Operation(summary = "게시글 수정 API", description = "postingId를 게시글을 찾아서 UrlList, files, postingContent,accountHistoryId등을 수정가능 (access token)")
    @PutMapping(value = "/{postingId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public PostingGetResponse putPostingByPostId(@PathVariable Long postingId
            , @ModelAttribute PostingUpdateRequest postingUpdateRequest){
        return postingService.updatePostingById(postingId, postingUpdateRequest);
    }

    @Operation(summary = "게시글 삭제 API", description = "postingId를 게시글 삭제+ 관련 댓글, 좋아요, 이미지(access token)")
    @DeleteMapping(value = "/{postingId}")
    public Long  deletePostingByPostId(@PathVariable Long postingId){
        postingService.PostingDeleteByPostId(postingId);
        return postingId;
    }











}
