package com.ssafy.memberservice.member.mapper;


import com.ssafy.memberservice.member.controller.dto.request.MemberCreateRequest;
import com.ssafy.memberservice.member.controller.dto.response.MemberGetResponse;
import com.ssafy.memberservice.member.infrastructure.repository.entity.MemberEntity;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberObjectMapper {

    MemberEntity fromMemberCreateRequestToEntity(MemberCreateRequest memberCreateRequest);
    MemberGetResponse fromEntityToMemberGetResponse(MemberEntity memberEntity);


}
