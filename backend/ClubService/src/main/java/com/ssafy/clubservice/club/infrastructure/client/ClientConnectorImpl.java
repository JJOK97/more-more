package com.ssafy.clubservice.club.infrastructure.client;

import com.ssafy.clubservice.club.infrastructure.client.dto.CreateAccount;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ClientConnectorImpl implements ClientConnector{
    private final AccountClient accountClient;
    @Override
    public void createAccount(String ssafyUserKey, String clubCode) {
        accountClient.createAccount(
                CreateAccount.builder()
                        .ssafyUserKey(ssafyUserKey)
                        .clubCode(clubCode)
                        .build()
        );
    }
}
