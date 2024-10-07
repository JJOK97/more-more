package com.ssafy.clubservice.club.infrastructure.client;

public interface ClientConnector {
    void createAccount(String ssafyUserKey, String clubCode);
}
