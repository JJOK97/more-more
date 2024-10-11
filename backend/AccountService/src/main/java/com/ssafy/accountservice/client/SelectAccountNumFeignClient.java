package com.ssafy.accountservice.client;

import com.ssafy.accountservice.account.controller.dto.request.AccountSelectApiRequest;
import com.ssafy.accountservice.account.controller.dto.response.AccountSelectBalanceApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "SelectAccountNumFeignClient", url = "https://finopenapi.ssafy.io/ssafy/api/v1/edu/demandDeposit/inquireDemandDepositAccount")
public interface SelectAccountNumFeignClient {
    @PostMapping(consumes = "application/json")
    AccountSelectBalanceApiResponse selectAccountBalance(@RequestBody AccountSelectApiRequest accountSelectApiRequest);
}