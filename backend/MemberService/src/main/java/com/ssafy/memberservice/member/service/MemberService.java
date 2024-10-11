package com.ssafy.memberservice.member.service;

import com.ssafy.memberservice.member.controller.dto.request.MemberCreateRequest;
import com.ssafy.memberservice.member.controller.dto.response.MemberAllGetResponse;
import com.ssafy.memberservice.member.controller.dto.response.MemberGetResponse;

import java.util.List;

public interface MemberService {
    void registerMember(MemberCreateRequest memberRequest);
    MemberGetResponse findByMemberId(Long memberId);
    List<MemberAllGetResponse> findAllMembers();
    String findName(String accountNumber);

    Boolean checkByAccountNumber(String accountNumber);

    void updateFcmToken(Long memberId, String fcmToken);

    String getFcmTokenByMemberId(Long memberId);
}
