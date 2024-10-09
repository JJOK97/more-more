package com.ssafy.accountservice.client;

import com.ssafy.accountservice.account.controller.dto.request.UseCardApiRequest;
import com.ssafy.accountservice.account.controller.dto.response.UseCardApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "UseCardFeignClient", url = "https://finopenapi.ssafy.io/ssafy/api/v1/edu/creditCard/createCreditCardTransaction")
public interface UseCardFeignClient {
    @PostMapping(consumes = "application/json")
    UseCardApiResponse useCardByPg(@RequestBody UseCardApiRequest useCardApiRequest);
}