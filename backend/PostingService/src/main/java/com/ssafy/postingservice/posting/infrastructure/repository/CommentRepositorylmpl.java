package com.ssafy.postingservice.posting.infrastructure.repository;
import com.ssafy.postingservice.global.member.MemberClient;
import com.ssafy.postingservice.posting.controller.dto.response.CommentFindResponse;
import com.ssafy.postingservice.posting.controller.dto.response.MemberGetResponse;
import com.ssafy.postingservice.posting.infrastructure.repository.entity.CommentEntity;
import com.ssafy.postingservice.posting.mapper.CommentObjectMapper;

import com.ssafy.postingservice.posting.service.domain.Comment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class CommentRepositorylmpl implements CommentRepository {
    private final CommentMybatisMapper commentMybatisMapper;
    private final CommentObjectMapper commentObjectMapper;
    private final MemberClient memberClient;

    @Override
    public Comment saveComment(Comment comment) {
        CommentEntity entity = commentObjectMapper.fromDomainToEntity(comment);
        commentMybatisMapper.saveComment(entity);
        return commentObjectMapper.fromEntityToDomain(entity);
    }

    @Override
    public List<CommentFindResponse> getComment(Long postingId) {
        // 댓글 엔티티 리스트 가져오기
        List<Comment> comments = commentObjectMapper.fromEntitiesToDomainList(commentMybatisMapper.getCommentByPostId(postingId));

        // CommentFindResponse 리스트 생성
        List<CommentFindResponse> commentResponses = new ArrayList<>();

        for (Comment comment : comments) {
            Long memberId = comment.getMemberId();

            // Feign Client를 통해 Member 서비스에서 회원 정보 가져오기
            MemberGetResponse memberInfo = memberClient.getMember(memberId);

            // CommentFindResponse 생성
            CommentFindResponse commentResponse = CommentFindResponse.builder()
                    .commentId(comment.getCommentId())
                    .postingId(comment.getPostingId())
                    .memberId(memberId)
                    .commentCreatedTime(comment.getCommentCreatedTime())
                    .commentContent(comment.getCommentContent())
                    .memberInfo(memberInfo)  // Feign Client로 가져온 회원 정보 추가
                    .build();

            commentResponses.add(commentResponse);
        }

        return commentResponses;
    }

    @Override
    public void deleteComment(Long commentId) {
        commentMybatisMapper.deleteComment(commentId);
    }

    @Override
    public Comment updateComment(Comment comment) {
        CommentEntity entity= commentObjectMapper.fromDomainToEntity(comment);
        commentMybatisMapper.updateComment(entity);
        return commentObjectMapper.fromEntityToDomain(entity);
    }

    @Override
    public void deleteComments(Long postingId) {
        commentMybatisMapper.deleteComments(postingId);
    }


}
