package com.ssafy.accountservice.account.service;

import com.ssafy.accountservice.account.controller.dto.request.AccountCreateApiRequest;
import com.ssafy.accountservice.account.controller.dto.request.AccountSelectApiRequest;
import com.ssafy.accountservice.account.controller.dto.request.AccountTransferApiRequest;
import com.ssafy.accountservice.account.controller.dto.response.AccountCreateApiResponse;
import com.ssafy.accountservice.account.controller.dto.response.AccountSelectBalanceApiResponse;
import com.ssafy.accountservice.account.controller.dto.response.AccountTransferApiResponse;
import com.ssafy.accountservice.account.infrastructure.repository.AccountRepository;
import com.ssafy.accountservice.account.service.domain.Account;
import com.ssafy.accountservice.account.service.domain.AccountTransfer;
import com.ssafy.accountservice.account.service.domain.AccountUtils;
import com.ssafy.accountservice.client.AccountFeignClient;
import com.ssafy.accountservice.client.AccountTransferFeignClient;
import com.ssafy.accountservice.client.SelectAccountNumFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final AccountFeignClient accountFeignClient;
    private final SelectAccountNumFeignClient selectAccountNumFeignClient;
    private final AccountTransferFeignClient accountTransferFeignClient;

    @Override
    public void accountCreate(Account account) {
        String ssafyUserKey = account.getSsafyUserKey();
        String apiKey = AccountUtils.getApiKey();

        // Header 생성
        AccountCreateApiRequest.Header header = new AccountCreateApiRequest.Header();
        header.setApiKey(apiKey);
        header.setUserKey(ssafyUserKey);

        // 전체 API 요청 객체 생성
        AccountCreateApiRequest accountCreateApiRequest = new AccountCreateApiRequest();
        accountCreateApiRequest.setHeader(header);
        accountCreateApiRequest.setAccountTypeUniqueNo("001-1-7c1e096a0f2d40");

        // Feign Client를 사용해 POST 요청 전송
        AccountCreateApiResponse accountCreateApiResponse = accountFeignClient.createAccount(accountCreateApiRequest);
        ArrayList<String> arr = new ArrayList<>();

        arr.add(accountCreateApiResponse.getRec().getAccountNo());
        arr.add(account.getClubCode());
        arr.add(account.getPwd());
        arr.add(ssafyUserKey);

        accountRepository.saveAccount(arr);
    }


    @Override
    public Map<String, String> accountSelectNumberAndBalance(String clubCode) {
        String apiKey = AccountUtils.getApiKey();

        // 모임코드 들고 왔을 때, 해당 모임의 총무 api key를 넣어서 조회
        Map<String, String> map = accountRepository.selectAccountNumberAndUserKey(clubCode);

        String managerKey = map.get("ssafy_user_key");
        String accountNum = map.get("ssafy_account_number");

        AccountSelectApiRequest accountSelectApiRequest = new AccountSelectApiRequest();
        accountSelectApiRequest.getHeader().setApiKey(apiKey);
        accountSelectApiRequest.getHeader().setUserKey(managerKey);
        accountSelectApiRequest.setAccountNo(accountNum);

        // Feign Client
        AccountSelectBalanceApiResponse response = selectAccountNumFeignClient.selectAccountBalance(accountSelectApiRequest);

        // account number, account balance만 담아서 return
        Map<String, String> numAndBalance = new HashMap<>();
        numAndBalance.put("account_num", accountNum);
        numAndBalance.put("account_balance", response.getRec().getAccountBalance());

        return numAndBalance;
    }

    @Override
    public ArrayList<String> accountTransfer(AccountTransfer accountTransfer) {
        String apiKey = AccountUtils.getApiKey();

        // 모임코드 들고 왔을 때, 해당 모임의 총무 api key를 넣어서 조회
        String withdrawalAccountNo = accountRepository.selectAccountNumber(accountTransfer.getClubCode());

        AccountTransferApiRequest accountTransferApiRequest = new AccountTransferApiRequest();
        accountTransferApiRequest.getHeader().setApiKey(apiKey);
        accountTransferApiRequest.getHeader().setUserKey(accountTransfer.getUserKey());
        accountTransferApiRequest.setDepositAccountNo(accountTransfer.getDepositAccountNo());
        accountTransferApiRequest.setTransactionBalance(accountTransfer.getTransactionBalance());
        accountTransferApiRequest.setWithdrawalAccountNo(withdrawalAccountNo);

        System.out.println("accountTransferApiRequest = " + accountTransferApiRequest);
        
        // Feign Client
        AccountTransferApiResponse accountTransferApiResponse = accountTransferFeignClient.transferAccountBalance(accountTransferApiRequest);
        AccountTransferApiResponse.REC firstRec = accountTransferApiResponse.getRec().get(0);


        ArrayList<String> arr = new ArrayList<>();

        // 계좌 잔고 들고 오는 로직
        // 모임코드 들고 왔을 때, 해당 모임의 총무 api key를 넣어서 조회
        Map<String, String> map = accountRepository.selectAccountNumberAndUserKey(accountTransfer.getClubCode());

        String managerKey = map.get("ssafy_user_key");
        String accountNum = map.get("ssafy_account_number");

        AccountSelectApiRequest accountSelectApiRequest = new AccountSelectApiRequest();
        accountSelectApiRequest.getHeader().setApiKey(apiKey);
        accountSelectApiRequest.getHeader().setUserKey(managerKey);
        accountSelectApiRequest.setAccountNo(accountNum);

        // Feign Client
        AccountSelectBalanceApiResponse balanceResponse = selectAccountNumFeignClient.selectAccountBalance(accountSelectApiRequest);

        // 계좌 잔고
        arr.add(balanceResponse.getRec().getAccountBalance());

        // 받는 계좌
        arr.add(firstRec.getTransactionAccountNo());

        // 송금 금액
        arr.add(accountTransfer.getTransactionBalance());
        
        return arr;
    }
}