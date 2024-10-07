package com.ssafy.clubservice.club.infrastructure.client;

import com.ssafy.clubservice.club.infrastructure.client.dto.CreateAccount;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "account-service", url = "https://j11a605.p.ssafy.io")
public interface AccountClient {
    @PostMapping("/api/account")
    void createAccount(@RequestBody CreateAccount createAccount);
}
