package com.ssafy.accountservice.account.service;

import com.ssafy.accountservice.account.controller.dto.request.AccountCreateApiRequest;
import com.ssafy.accountservice.account.controller.dto.request.AccountCreateApiRequest.Header;
import com.ssafy.accountservice.account.controller.dto.request.AccountSelectApiRequest;
import com.ssafy.accountservice.account.controller.dto.response.AccountCreateApiResponse;
import com.ssafy.accountservice.account.controller.dto.response.AccountSelectBalanceApiResponse;
import com.ssafy.accountservice.account.infrastructure.repository.AccountRepository;
import com.ssafy.accountservice.account.service.domain.Account;
import com.ssafy.accountservice.account.service.domain.AccountUtils;
import com.ssafy.accountservice.client.AccountFeignClient;
import com.ssafy.accountservice.client.SelectAccountNumFeignClient;
import io.github.cdimascio.dotenv.Dotenv;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final AccountFeignClient accountFeignClient;
    private final SelectAccountNumFeignClient selectAccountNumFeignClient;

    @Override
    public void accountCreate(Account account) {
        System.out.println("account = " + account);
        
        String ssafyUserKey = account.getSsafyUserKey();
        String apiKey = AccountUtils.getApiKey();

        System.out.println("ssafyUserKey = " + ssafyUserKey);
        
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
        Map<String, String> map = accountRepository.selectAccountNumber(clubCode);

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
}
