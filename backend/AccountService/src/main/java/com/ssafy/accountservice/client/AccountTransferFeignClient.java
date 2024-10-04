package com.ssafy.accountservice.client;

import com.ssafy.accountservice.account.controller.dto.request.AccountTransferApiRequest;
import com.ssafy.accountservice.account.controller.dto.response.AccountTransferApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "AccountTransferFeignClient", url = "https://finopenapi.ssafy.io/ssafy/api/v1/edu/demandDeposit/updateDemandDepositAccountTransfer")
public interface AccountTransferFeignClient {
    @PostMapping(consumes = "application/json")
    AccountTransferApiResponse transferAccountBalance(@RequestBody AccountTransferApiRequest accountTransferApiRequest);
}