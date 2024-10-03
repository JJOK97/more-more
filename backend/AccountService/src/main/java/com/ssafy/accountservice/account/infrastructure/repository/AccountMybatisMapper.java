package com.ssafy.accountservice.account.infrastructure.repository;

import com.ssafy.accountservice.account.infrastructure.repository.entity.AccountEntity;
import com.ssafy.accountservice.account.service.domain.AccountHistoryAll;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface AccountMybatisMapper {
    void insertAccount(AccountEntity accountEntity);
    Map<String, String> selectAccountNumAndManagerKey(String clubCode);
    String selectAccountNum(String clubCode);
    void insertAccountHistory(AccountHistoryAll accountHistoryAll);
    String selectAccountNumByPg(String cardNum);
}
