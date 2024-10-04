package com.ssafy.accountservice.account.service;

import com.ssafy.accountservice.account.controller.dto.request.AccountTransferFillRequest;
import com.ssafy.accountservice.account.controller.dto.request.CardRequest;
import com.ssafy.accountservice.account.infrastructure.repository.entity.AccountHistoryEntity;
import com.ssafy.accountservice.account.service.domain.Account;
import com.ssafy.accountservice.account.service.domain.AccountTransfer;

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
}
