package com.ssafy.accountservice.account.infrastructure.repository;

import com.ssafy.accountservice.account.infrastructure.repository.entity.AccountHistoryEntity;
import com.ssafy.accountservice.account.service.domain.AccountHistoryAll;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface AccountRepository {
    void saveAccount(ArrayList<String> arrayList);
    Map<String, String> selectAccountNumberAndUserKey(String clubCode);
    String selectAccountNumber(String clubCode);
    void insertAccountHistory(AccountHistoryAll accountHistoryAll);
    String useAccountPg(String cardNum);
    String selectAccountNum(String clubCode);
    List<AccountHistoryEntity> selectAccountHistory(String accountNum);
}
