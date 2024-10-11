package com.ssafy.memberservice.member.infrastructure.repository;


import com.ssafy.memberservice.member.infrastructure.repository.entity.MemberEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MemberMybatisMapper {
    void saveMember(MemberEntity memberEntity);

    MemberEntity findByMemberId(Long memberId);

    List<MemberEntity> findAllMembers();

    MemberEntity findByPhoneNumber(String phoneNumber);

    String findByAccountNumber(String accountNumber);

    Boolean checkAccount(String accountNumber);

    void updateFcmToken(@Param("memberId") Long memberId, @Param("fcmToken") String fcmToken);

    String getFcmTokenByMemberId(@Param("memberId")Long memberId);
}
