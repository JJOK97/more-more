package com.ssafy.accountservice.client;

import com.ssafy.accountservice.account.controller.dto.request.AccountCreateApiRequest;
import com.ssafy.accountservice.account.controller.dto.response.AccountCreateApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "accountFeignClient", url = "https://finopenapi.ssafy.io/ssafy/api/v1/edu/demandDeposit/createDemandDepositAccount")
public interface AccountFeignClient {
    @PostMapping(consumes = "application/json")
    AccountCreateApiResponse createAccount(@RequestBody AccountCreateApiRequest accountCreateApiRequest);
}