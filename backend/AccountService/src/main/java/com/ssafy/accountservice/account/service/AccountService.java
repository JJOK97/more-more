package com.ssafy.accountservice.account.service;

import com.ssafy.accountservice.account.service.domain.Account;
import com.ssafy.accountservice.account.service.domain.AccountTransfer;

import java.util.ArrayList;
import java.util.Map;

public interface AccountService {
    void accountCreate(Account account);
    Map<String, String> accountSelectNumberAndBalance(String clubCode);
    ArrayList<String> accountTransfer(AccountTransfer accountTransfer);
}
