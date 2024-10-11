package com.ssafy.accountservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "member-service-byAccountNum", url = "https://j11a605.p.ssafy.io/api/member")
public interface MemberClientByAccountNumber {
    @GetMapping("/{ssafyAccountNumber}/account")
    String findName(@PathVariable("ssafyAccountNumber") String ssafyAccountNumber);
}