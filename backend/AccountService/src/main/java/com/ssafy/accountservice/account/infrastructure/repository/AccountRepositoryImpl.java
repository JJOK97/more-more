package com.ssafy.accountservice.account.infrastructure.repository;

import com.ssafy.accountservice.account.infrastructure.repository.entity.AccountEntity;
import com.ssafy.accountservice.account.mapper.AccountObjectMapper;
import com.ssafy.accountservice.account.service.domain.AccountHistoryAll;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class AccountRepositoryImpl implements AccountRepository {

    private final AccountMybatisMapper accountMybatisMapper;
    private final AccountObjectMapper accountObjectMapper;

    @Override
    public void saveAccount(ArrayList<String> arrayList) {
        AccountEntity accountEntity = accountObjectMapper.fromDomainToEntity(arrayList);
        accountMybatisMapper.insertAccount(accountEntity);
    }

    @Override
    public Map<String, String> selectAccountNumberAndUserKey(String clubCode) {
        return accountMybatisMapper.selectAccountNumAndManagerKey(clubCode);
    }

    @Override
    public String selectAccountNumber(String clubCode) {
        return accountMybatisMapper.selectAccountNum(clubCode);
    }

    @Override
    public void insertAccountHistory(AccountHistoryAll accountHistoryAll) {
        accountMybatisMapper.insertAccountHistory(accountHistoryAll);
    }
}