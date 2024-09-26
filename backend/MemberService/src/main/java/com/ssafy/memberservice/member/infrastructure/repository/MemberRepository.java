package com.ssafy.memberservice.member.infrastructure.repository;

import com.ssafy.memberservice.member.infrastructure.repository.entity.MemberEntity;

public interface MemberRepository {
    void saveMember(MemberEntity memberEntity);

    MemberEntity findByMemberId(Long memberId);
}
