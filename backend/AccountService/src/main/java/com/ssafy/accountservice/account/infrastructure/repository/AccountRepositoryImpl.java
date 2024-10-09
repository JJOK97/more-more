package com.ssafy.accountservice.account.infrastructure.repository;

import com.ssafy.accountservice.account.controller.dto.request.VerificationSaveRequest;
import com.ssafy.accountservice.account.infrastructure.repository.entity.AccountEntity;
import com.ssafy.accountservice.account.infrastructure.repository.entity.AccountHistoryEntity;
import com.ssafy.accountservice.account.infrastructure.repository.entity.VerifyEntity;
import com.ssafy.accountservice.account.mapper.AccountObjectMapper;
import com.ssafy.accountservice.account.service.domain.AccountHistoryAll;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
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

    @Override
    public String useAccountPg(String cardNum) {
        return accountMybatisMapper.selectAccountNumByPg(cardNum);
    }

    @Override
    public String selectAccountNum(String clubCode) {
        return accountMybatisMapper.selectAccountNumByClubCode(clubCode);
    }

    @Override
    public List<AccountHistoryEntity> selectAccountHistory(String accountNum) {
        return accountMybatisMapper.selectAccountHistoryByAccountNum(accountNum);
    }

    @Override
    public AccountHistoryEntity selectHistoryOnly(String ssafyTransactionNumber) {
        return accountMybatisMapper.selectAccountHistoryOnly(ssafyTransactionNumber);
    }

    @Override
    public void insertVerify(VerificationSaveRequest verificationSaveRequest) {
        accountMybatisMapper.insertByTransactionNum(verificationSaveRequest);
    }

    @Override
    public VerifyEntity selectVerify(String ssafyTransactionNumber) {
        return accountMybatisMapper.selectByTransactionNum(ssafyTransactionNumber);
    }

    @Override
    public void updateVerify(String ssafyTransactionNumber, VerificationSaveRequest verificationSaveRequest) {
        accountMybatisMapper.updateByTransactionNum(ssafyTransactionNumber, verificationSaveRequest);
    }

    @Override
    public void deletetVerify(String ssafyTransactionNumber) {
        accountMybatisMapper.deleteByTransactionNum(ssafyTransactionNumber);
    }

    @Override
    public String selectUserKey(String clubCode) {
        return accountMybatisMapper.selectUserKeyByClubCode(clubCode);
    }

}