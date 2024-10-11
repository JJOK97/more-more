package com.ssafy.postingservice.posting.infrastructure.repository;


import com.ssafy.postingservice.posting.controller.dto.response.CommentFindResponse;
import com.ssafy.postingservice.posting.service.domain.Comment;

import java.util.List;


public interface CommentRepository {
    Comment saveComment(Comment comment);
    List<CommentFindResponse> getComment(Long id);
    void deleteComment(Long commentId);
    Comment updateComment(Comment comment);

    void deleteComments(Long postingId);
}
