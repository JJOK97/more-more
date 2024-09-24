package com.ssafy.postingservice.posting.mapper;


import com.ssafy.postingservice.posting.infrastructure.repository.entity.PostImageEntity;

import com.ssafy.postingservice.posting.service.domain.PostImage;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PostImageObjectMapper {

    PostImage fromEntityToDomain(PostImageEntity PostImageEntity);


}
