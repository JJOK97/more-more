package com.ssafy.postingservice.posting.service;


import com.ssafy.postingservice.posting.controller.dto.request.CommentUpdateRequest;
import com.ssafy.postingservice.posting.controller.dto.response.CommentFindResponse;
import com.ssafy.postingservice.posting.service.domain.Comment;

import java.util.List;

public interface CommentService {
    Comment createComment(Comment comment);

    List<Comment> findBypostingId(Long postingId);

    void deleteByCommentId(Long commentId);

    Comment updateComment(Comment comment);
}
