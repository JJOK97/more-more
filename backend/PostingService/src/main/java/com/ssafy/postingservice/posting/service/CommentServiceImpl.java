package com.ssafy.postingservice.posting.service;

import com.ssafy.postingservice.global.member.MemberClient;
import com.ssafy.postingservice.posting.controller.dto.response.CommentFindResponse;
import com.ssafy.postingservice.posting.controller.dto.response.MemberGetResponse;
import com.ssafy.postingservice.posting.infrastructure.repository.CommentRepository;
import com.ssafy.postingservice.posting.infrastructure.repository.CommentRepositorylmpl;
import com.ssafy.postingservice.posting.service.domain.Comment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {


    private final CommentRepository commentRepository;

    @Override
    public Comment createComment(Comment comment) {
        return commentRepository.saveComment(comment);
    }

    @Override
    public List<CommentFindResponse> findBypostingId(Long postingId) {
        // 댓글과 회원 정보를 포함한 CommentFindResponse 리스트를 직접 받아서 반환
        return commentRepository.getComment(postingId);
    }

    @Override
    public void deleteByCommentId(Long commentId) {
        commentRepository.deleteComment(commentId);
    }

    @Override
    public Comment updateComment(Comment comment) {
       return commentRepository.updateComment(comment);
    }




}
