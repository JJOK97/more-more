package com.ssafy.accountservice.account.controller;

import com.ssafy.accountservice.account.controller.dto.request.AccountCreateRequest;
import com.ssafy.accountservice.account.mapper.AccountObjectMapper;
import com.ssafy.accountservice.account.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/account")
@RestController
public class AccountController {

    private final AccountService accountService;
    private final AccountObjectMapper accountObjectMapper;

    @PostMapping
    public ResponseEntity<?> createAccount(@RequestBody AccountCreateRequest accountCreateRequest) {
        accountService.accountCreate(accountObjectMapper.fromCreateRequestToDomain(accountCreateRequest));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}