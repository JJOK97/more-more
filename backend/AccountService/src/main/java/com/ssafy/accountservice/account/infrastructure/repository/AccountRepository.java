package com.ssafy.accountservice.account.infrastructure.repository;

import com.ssafy.accountservice.account.controller.dto.request.VerificationSaveRequest;
import com.ssafy.accountservice.account.infrastructure.repository.entity.AccountHistoryEntity;
import com.ssafy.accountservice.account.infrastructure.repository.entity.VerifyEntity;
import com.ssafy.accountservice.account.service.domain.AccountHistoryAll;
import org.springframework.http.ResponseEntity;

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
    AccountHistoryEntity selectHistoryOnly(String ssafyTransactionNumber);
    void insertVerify(VerificationSaveRequest verificationSaveRequest);
    VerifyEntity selectVerify(String ssafyTransactionNumber);
    void updateVerify(String ssafyTransactionNumber, VerificationSaveRequest verificationSaveRequest);
    void deletetVerify(String ssafyTransactionNumber);
    String selectUserKey(String clubCode);
    List<AccountHistoryEntity> selectAccountNumByDate(String accountNum, String date);
    List<String> selectTagNameByAccountNum(String accountNum);
}
