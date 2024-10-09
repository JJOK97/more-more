package com.ssafy.memberservice.member.infrastructure.repository;


import com.ssafy.memberservice.member.infrastructure.repository.entity.MemberEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MemberMybatisMapper {
    void saveMember(MemberEntity memberEntity);

    MemberEntity findByMemberId(Long memberId);

    List<MemberEntity> findAllMembers();

    MemberEntity findByPhoneNumber(String phoneNumber);

    String findByAccountNumber(String accountNumber);

    Boolean checkAccount(String accountNumber);
}
