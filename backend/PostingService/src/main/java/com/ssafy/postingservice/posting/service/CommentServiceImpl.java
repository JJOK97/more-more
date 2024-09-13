package com.ssafy.postingservice.posting.service;

import com.ssafy.postingservice.posting.controller.dto.response.CommentFindResponse;
import com.ssafy.postingservice.posting.infrastructure.repository.CommentRepositorylmpl;
import com.ssafy.postingservice.posting.service.domain.Comment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {


    private final CommentRepositorylmpl commentRepositorylmpl;

    @Override
    public Comment createComment(Comment comment) {
        return commentRepositorylmpl.saveComment(comment);
    }

    @Override
    public List<Comment> findBypostingId(Long postingId) {
        return commentRepositorylmpl.getComment(postingId);
    }
}
