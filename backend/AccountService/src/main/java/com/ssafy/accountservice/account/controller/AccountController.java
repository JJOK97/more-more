package com.ssafy.accountservice.account.controller;

import com.ssafy.accountservice.account.controller.dto.request.AccountCreateRequest;
import com.ssafy.accountservice.account.controller.dto.request.AccountTransferFillRequest;
import com.ssafy.accountservice.account.controller.dto.request.AccountTransferRequest;
import com.ssafy.accountservice.account.controller.dto.request.CardRequest;
import com.ssafy.accountservice.account.infrastructure.repository.entity.AccountHistoryEntity;
import com.ssafy.accountservice.account.mapper.AccountObjectMapper;
import com.ssafy.accountservice.account.service.AccountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Tag(name = "Account API", description = "계좌 생성 API")
@RequiredArgsConstructor
@RequestMapping("/api/account")
@RestController
public class AccountController {

    private final AccountService accountService;
    private final AccountObjectMapper accountObjectMapper;

    @Operation(summary = "계좌 생성하기")
    @PostMapping
    public ResponseEntity<?> createAccount(@RequestBody AccountCreateRequest accountCreateRequest) {
        accountService.accountCreate(accountObjectMapper.fromCreateRequestToDomain(accountCreateRequest));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Operation(summary = "계좌 번호 및 잔액 조회하기")
    @GetMapping("/{clubCode}")
    public ResponseEntity<Map<String, String>> selectAccountNumberAndBalance(@PathVariable String clubCode) {
        Map<String, String> accountData = accountService.accountSelectNumberAndBalance(clubCode);
        return new ResponseEntity<>(accountData, HttpStatus.OK);
    }

    @Operation(summary = "계좌 이체 (보내기)")
    @PostMapping("/transfer")
    public ResponseEntity<ArrayList<String>> transferAccount(@RequestBody AccountTransferRequest accountTransferRequest) {
        ArrayList<String> responseMessage = accountService.accountTransfer(accountObjectMapper.fromTransferCreateRequestToDomain(accountTransferRequest));
        return new ResponseEntity<>(responseMessage, HttpStatus.CREATED);
    }

    @Operation(summary = "계좌 이체 (채우기)")
    @PostMapping("/fill")
    public ResponseEntity<ArrayList<String>> fillAccount(@RequestBody AccountTransferFillRequest accountTransferFillRequest) {
        ArrayList<String> responseMessage = accountService.accountFill(accountTransferFillRequest);
        return new ResponseEntity<>(responseMessage, HttpStatus.CREATED);
    }

    @Operation(summary = "계좌 입출금 조회")
    @GetMapping("/{clubCode}/history")
    public ResponseEntity<List<AccountHistoryEntity>> historyAccount(@PathVariable("clubCode") String clubCode) {
        List<AccountHistoryEntity> response = accountService.accountHistory(clubCode);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "카드 결제")
    @PostMapping("/card")
    public ResponseEntity<String> useCard(@RequestBody CardRequest cardRequest) {
        String responseMessage = accountService.cardUse(cardRequest);
        return new ResponseEntity<>(responseMessage, HttpStatus.CREATED);
    }
}