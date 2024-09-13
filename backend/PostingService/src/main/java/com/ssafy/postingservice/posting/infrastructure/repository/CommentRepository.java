package com.ssafy.postingservice.posting.infrastructure.repository;

import com.ssafy.postingservice.posting.infrastructure.repository.entity.CommentEntity;
import com.ssafy.postingservice.posting.service.domain.Comment;

import java.util.List;


public interface CommentRepository {


    Comment saveComment(Comment comment);
    List<Comment> getComment(Long id);
}
