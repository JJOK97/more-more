package com.ssafy.memberservice.member.infrastructure.repository;


import com.ssafy.memberservice.member.infrastructure.repository.entity.MemberEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMybatisMapper {
    void saveMember(MemberEntity memberEntity);

    MemberEntity findByMemberId(Long memberId);
}
