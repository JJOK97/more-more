package com.ssafy.postingservice.posting.infrastructure.repository;
import com.ssafy.postingservice.posting.infrastructure.repository.entity.CommentEntity;
import com.ssafy.postingservice.posting.mapper.CommentObjectMapper;

import com.ssafy.postingservice.posting.service.domain.Comment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class CommentRepositorylmpl implements CommentRepository {
    private final CommentMybatisMapper commentMybatisMapper;
    private final CommentObjectMapper commentObjectMapper;


    @Override
    public Comment saveComment(Comment comment) {

        CommentEntity entity = commentObjectMapper.toEntity(comment);
        commentMybatisMapper.saveComment(entity);


        return commentObjectMapper.fromEntity(entity);
    }

    @Override
    public List<Comment> getComment(Long id) {
        return commentObjectMapper.toDomainListFromEntities(commentMybatisMapper.getCommentByPostId(id));
    }


}
