package com.ssafy.postingservice.posting.infrastructure.repository;


import com.ssafy.postingservice.posting.infrastructure.repository.entity.CommentEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface CommentMybatisMapper {
    void saveComment(CommentEntity entity);
    List<CommentEntity> getCommentByPostId(Long postingId);
    void deleteComment(Long commentId);
    void updateComment(CommentEntity entity);

    void deleteComments(Long postingId);
}
