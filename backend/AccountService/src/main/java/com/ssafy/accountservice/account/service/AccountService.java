package com.ssafy.accountservice.account.service;

import com.ssafy.accountservice.account.service.domain.Account;

import java.util.Map;

public interface AccountService {
    void accountCreate(Account account);
    Map<String, String> accountSelectNumberAndBalance(String clubCode);
}
