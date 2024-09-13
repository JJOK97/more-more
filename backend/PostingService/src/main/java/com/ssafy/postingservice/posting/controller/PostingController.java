package com.ssafy.postingservice.posting.controller;


import com.ssafy.postingservice.posting.controller.dto.request.CommentCreateRequest;
import com.ssafy.postingservice.posting.controller.dto.request.PostingCreateRequest;
import com.ssafy.postingservice.posting.controller.dto.response.CommentCreateResponse;
import com.ssafy.postingservice.posting.controller.dto.response.CommentFindResponse;
import com.ssafy.postingservice.posting.controller.dto.response.PostingCreateResponse;
import com.ssafy.postingservice.posting.mapper.CommentObjectMapper;
import com.ssafy.postingservice.posting.mapper.PostingObjectMapper;
import com.ssafy.postingservice.posting.service.CommentService;
import com.ssafy.postingservice.posting.service.PostingService;
import com.ssafy.postingservice.posting.service.domain.Comment;
import com.ssafy.postingservice.posting.service.domain.Posting;
import lombok.RequiredArgsConstructor;
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

    @PostMapping
    public PostingCreateResponse create(@RequestBody PostingCreateRequest postingCreateRequest) {
        // Posting 객체 생성
        Posting posting = postingService.create(postingObjectMapper.toDomain(postingCreateRequest));
        return postingObjectMapper.toCreateResponse(posting);
    }

    @GetMapping("/{clubCode}")
    public List<Posting> getPostsByClubCode(@PathVariable String clubCode) {
        return postingService.findByClubCode(clubCode);
    }

    @PostMapping("{postingId}/comment")
    public CommentCreateResponse createComment(@PathVariable Long postingId, @RequestBody CommentCreateRequest commentCreateRequest) {
        commentCreateRequest.setPostingId(postingId);
        Comment comment = commentService.createComment(commentObjectMapper.toDomain(commentCreateRequest));
        return commentObjectMapper.toCreateResponse(comment);
    }

    @GetMapping("/{postingId}/comment")
    public List<CommentFindResponse>getComment(@PathVariable Long postingId) {
        return commentObjectMapper.toFindResponseListFromDomain(commentService.findBypostingId(postingId));
    }



}
