package com.ssafy.accountservice.client;

import com.ssafy.accountservice.account.controller.dto.response.ClubReadResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "SelectClubFeignClient", url = "https://j11a605.p.ssafy.io/api/club")
public interface SelectClubFeignClient {

    @GetMapping("/{clubCode}")
    ClubReadResponse findClub(@PathVariable("clubCode") String clubCode);
}