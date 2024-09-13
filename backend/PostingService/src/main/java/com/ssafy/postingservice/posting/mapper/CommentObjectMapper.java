package com.ssafy.postingservice.posting.mapper;



import com.ssafy.postingservice.posting.controller.dto.request.CommentCreateRequest;
import com.ssafy.postingservice.posting.controller.dto.response.CommentCreateResponse;
import com.ssafy.postingservice.posting.controller.dto.response.CommentFindResponse;
import com.ssafy.postingservice.posting.infrastructure.repository.entity.CommentEntity;
import com.ssafy.postingservice.posting.service.domain.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentObjectMapper {
   @Mapping(source = "comments", target = "commentEntities")
   List<CommentEntity> toEntityList(List<Comment> comments);


   CommentEntity toEntity(Comment comment);
   Comment toDomain(CommentCreateRequest postingCreateRequest);
   CommentCreateResponse toCreateResponse(Comment comment);
   Comment fromEntity(CommentEntity commentEntity);

   List<Comment> toDomainListFromEntities(List<CommentEntity> commentEntities);
   List<CommentCreateResponse> toCreateResponseListFromEntities(List<CommentEntity> commentEntities);
   List<CommentFindResponse> toFindResponseListFromDomain(List<Comment> comments);


}
