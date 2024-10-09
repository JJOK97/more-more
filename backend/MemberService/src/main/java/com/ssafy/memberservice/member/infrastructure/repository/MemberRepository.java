package com.ssafy.memberservice.member.infrastructure.repository;

import com.ssafy.memberservice.member.infrastructure.repository.entity.MemberEntity;

import java.util.List;

public interface MemberRepository {
    void saveMember(MemberEntity memberEntity);

    MemberEntity findByMemberId(Long memberId);

    MemberEntity findByPhoneNumber(String phoneNumber);

    List<MemberEntity> findAllMembers();

    String findByAccountNumber(String accountNumber);

    Boolean checkAccount(String accountNumber);
}
