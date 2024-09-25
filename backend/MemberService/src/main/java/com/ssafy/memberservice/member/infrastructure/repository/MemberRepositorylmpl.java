package com.ssafy.memberservice.member.infrastructure.repository;


import com.ssafy.memberservice.member.infrastructure.repository.entity.MemberEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberRepositorylmpl implements MemberRepository {


    private final MemberMybatisMapper memberMybatisMapper;
    @Override
    public void saveMember(MemberEntity memberEntity) {
        System.out.println(memberEntity.getAccountNumber());
        memberMybatisMapper.saveMember(memberEntity);
    }

    @Override
    public MemberEntity findByMemberId(Long memberId) {
        return memberMybatisMapper.findByMemberId(memberId);
    }
}
