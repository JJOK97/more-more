package com.ssafy.clubservice.club.infrastructure.client;

import com.ssafy.clubservice.club.infrastructure.client.dto.CreateAccount;
import com.ssafy.clubservice.club.service.domain.Account;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ClientConnectorImpl implements ClientConnector{
    private final AccountClient accountClient;
    @Override
    public void createAccount(Account account, String clubCode) {
        accountClient.createAccount(
                CreateAccount.builder()
                        .ssafyUserKey(account.getSsafyKey())
                        .pwd(account.getPwd())
                        .clubCode(clubCode)
                        .build()
        );
    }
}
