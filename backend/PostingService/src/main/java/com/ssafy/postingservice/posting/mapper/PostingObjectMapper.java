package com.ssafy.postingservice.posting.mapper;



import com.ssafy.postingservice.posting.controller.dto.request.PostingCreateRequest;
import com.ssafy.postingservice.posting.controller.dto.response.PostingCreateResponse;
import com.ssafy.postingservice.posting.controller.dto.response.PostingGetAllResponse;
import com.ssafy.postingservice.posting.controller.dto.response.PostingGetResponse;
import com.ssafy.postingservice.posting.controller.dto.response.PostingUpdateResponse;
import com.ssafy.postingservice.posting.infrastructure.repository.entity.PostingEntity;
import com.ssafy.postingservice.posting.infrastructure.repository.entity.PostingOneEntity;
import com.ssafy.postingservice.posting.service.domain.Posting;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PostingObjectMapper {

   Posting fromEntityToDomain(PostingEntity postingEntity);
   PostingEntity fromDomainToEntity(Posting posting);
   Posting fromCreateRequestToDomain (PostingCreateRequest postingCreateRequest);
   PostingCreateResponse fromDomainToCreateResponse (Posting posting);
   PostingGetAllResponse fromDomainToPostingGetAllResponse (Posting posting);
   PostingUpdateResponse fromDomainToUpdateResponse(Posting posting);
   PostingGetResponse fromEntityToPostingGetResponse (PostingEntity entity);
   List<Posting> fromEntitiesToDomainList(List<PostingEntity> postingEntities);
   PostingOneEntity fromPostingGetResponseToOneEntity(PostingGetResponse postingGetResponse);
}
