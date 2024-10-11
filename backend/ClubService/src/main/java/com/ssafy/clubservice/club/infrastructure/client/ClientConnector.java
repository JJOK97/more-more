package com.ssafy.clubservice.club.infrastructure.client;

import com.ssafy.clubservice.club.service.domain.Account;

public interface ClientConnector {
    void createAccount(Account account, String clubCode);
}
