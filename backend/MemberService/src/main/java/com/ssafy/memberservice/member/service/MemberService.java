package com.ssafy.memberservice.member.service;

import com.ssafy.memberservice.member.controller.dto.request.MemberCreateRequest;
import com.ssafy.memberservice.member.controller.dto.response.MemberGetResponse;

public interface MemberService {
    void registerMember(MemberCreateRequest memberRequest);

    MemberGetResponse findByMemberId(Long memberId);
}
