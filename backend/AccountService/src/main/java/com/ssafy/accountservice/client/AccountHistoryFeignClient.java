package com.ssafy.accountservice.client;

import com.ssafy.accountservice.account.controller.dto.request.AccountHistoryApiRequest;
import com.ssafy.accountservice.account.controller.dto.response.AccountHistoryApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "AccountHistoryFeignClient", url = "https://finopenapi.ssafy.io/ssafy/api/v1/edu/demandDeposit/inquireTransactionHistoryList")
public interface AccountHistoryFeignClient {
    @PostMapping(consumes = "application/json")
    AccountHistoryApiResponse transferAccountHistory(@RequestBody AccountHistoryApiRequest accountHistoryApiRequest);
}
