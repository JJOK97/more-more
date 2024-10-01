package com.ssafy.accountservice.account.infrastructure.repository;

import com.ssafy.accountservice.account.infrastructure.repository.entity.AccountEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface AccountMybatisMapper {
    void insertAccount(AccountEntity accountEntity);
    Map<String, String> selectAccountNumAndManagerKey(String clubCode);
    String selectAccountNum(String clubCode);
}
