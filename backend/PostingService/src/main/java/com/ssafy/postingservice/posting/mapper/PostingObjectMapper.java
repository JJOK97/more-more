package com.ssafy.postingservice.posting.mapper;


import com.ssafy.postingservice.posting.controller.PostingController;
import com.ssafy.postingservice.posting.controller.dto.request.PostingCreateRequest;
import com.ssafy.postingservice.posting.controller.dto.response.PostingCreateResponse;
import com.ssafy.postingservice.posting.infrastructure.repository.entity.PostingEntity;
import com.ssafy.postingservice.posting.service.domain.Posting;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;



@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PostingObjectMapper {
   public PostingEntity from (Posting posting);

   Posting to(PostingEntity postingEntity);

   public PostingEntity toEntity (Posting posting);


   public Posting toDomain (PostingCreateRequest postingCreateRequest);
   public PostingCreateResponse toCreateResponse (Posting posting);
   public Posting fromEntity(PostingEntity postingEntity);

}
