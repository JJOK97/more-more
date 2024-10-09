package com.ssafy.memberservice.member.infrastructure.repository;


import com.ssafy.memberservice.member.infrastructure.repository.entity.MemberEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MemberRepositorylmpl implements MemberRepository {


    private final MemberMybatisMapper memberMybatisMapper;
    @Override
    public void saveMember(MemberEntity memberEntity) {
        memberMybatisMapper.saveMember(memberEntity);
    }

    @Override
    public MemberEntity findByMemberId(Long memberId) {
        return memberMybatisMapper.findByMemberId(memberId);
    }

    @Override
    public MemberEntity findByPhoneNumber(String phoneNumber) {
        return memberMybatisMapper.findByPhoneNumber(phoneNumber);
    }
    @Override
    public List<MemberEntity> findAllMembers() {
        return memberMybatisMapper.findAllMembers();
    }

    @Override
    public String findByAccountNumber(String accountNumber) {
        return memberMybatisMapper.findByAccountNumber(accountNumber);
    }
}
