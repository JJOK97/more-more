package com.ssafy.accountservice.account.service;

import com.ssafy.accountservice.account.controller.dto.request.AccountTransferFillRequest;
import com.ssafy.accountservice.account.controller.dto.request.CardRequest;
import com.ssafy.accountservice.account.controller.dto.request.VerificationSaveRequest;
import com.ssafy.accountservice.account.infrastructure.repository.entity.AccountHistoryEntity;
import com.ssafy.accountservice.account.infrastructure.repository.entity.DateEntity;
import com.ssafy.accountservice.account.infrastructure.repository.entity.VerifyEntity;
import com.ssafy.accountservice.account.service.domain.Account;
import com.ssafy.accountservice.account.service.domain.AccountTransfer;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface AccountService {
    void accountCreate(Account account);
    Map<String, String> accountSelectNumberAndBalance(String clubCode);
    ArrayList<String> accountTransfer(AccountTransfer accountTransfer);
    ArrayList<String> accountFill(AccountTransferFillRequest accountTransferFillRequest);
    List<AccountHistoryEntity> accountHistory(String clubCode);
    String cardUse(CardRequest cardRequest);
    AccountHistoryEntity historyGetOnly(String tagName);
    void verifySave(VerificationSaveRequest verificationSaveRequest);
    VerifyEntity verifySelect(String tagName);
    void verifyUpdate(VerificationSaveRequest verificationSaveRequest);
    void verifyDelete(String tagName);
    Map<String, String> accountBalanceMemberId(Long memberId);
    List<AccountHistoryEntity> accountHistoryByDate(String clubCode, String date);
    List<String> tagNameSelect(String clubCode);
    List<String> dateCompare(String clubCode, String date);
    void isVerificationIn(String tagName);
    void verifyUpdateMemo(String tagName, String accountHistoryMemo);
    void verifyUpdateImage(String tagName, String accountHistoryImage);
}