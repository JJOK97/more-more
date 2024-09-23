package com.ssafy.postingservice.posting.mapper;



import com.ssafy.postingservice.posting.controller.dto.request.CommentCreateRequest;
import com.ssafy.postingservice.posting.controller.dto.request.CommentUpdateRequest;
import com.ssafy.postingservice.posting.controller.dto.response.CommentCreateResponse;
import com.ssafy.postingservice.posting.controller.dto.response.CommentFindResponse;
import com.ssafy.postingservice.posting.controller.dto.response.CommentUpdateReponse;
import com.ssafy.postingservice.posting.infrastructure.repository.entity.CommentEntity;
import com.ssafy.postingservice.posting.service.domain.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentObjectMapper {



   CommentEntity fromDomainToEntity(Comment comment);
   Comment fromCreatRequestToDomain(CommentCreateRequest postingCreateRequest);
   CommentCreateResponse fromDomainToCreateResponse(Comment comment);
   Comment fromEntityToDomain(CommentEntity commentEntity);
   List<Comment> fromEntitiesToDomainList(List<CommentEntity> commentEntities);
   List<CommentFindResponse> fromDomainListToFindResponse(List<Comment> comments);
   Comment fromCommentUpdateRequestToDomain(CommentUpdateRequest commentUpdateRequest);
   CommentUpdateReponse fromDomainToUpdateResponse(Comment comment);


}
