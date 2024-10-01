package com.ssafy.accountservice.account.service;

import com.ssafy.accountservice.account.controller.dto.request.AccountCreateApiRequest;
import com.ssafy.accountservice.account.controller.dto.request.AccountCreateApiRequest.Header;
import com.ssafy.accountservice.account.controller.dto.request.AccountSelectApiRequest;
import com.ssafy.accountservice.account.controller.dto.response.AccountCreateApiResponse;
import com.ssafy.accountservice.account.controller.dto.response.AccountSelectBalanceApiResponse;
import com.ssafy.accountservice.account.infrastructure.repository.AccountRepository;
import com.ssafy.accountservice.account.service.domain.Account;
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
        AccountCreateApiRequest accountCreateApiRequest = createAccountRequest(account);
        
        // Feign Client를 사용해 POST 요청 전송
        AccountCreateApiResponse accountCreateApiResponse = accountFeignClient.createAccount(accountCreateApiRequest);
        ArrayList<String> arr = new ArrayList<>();

        arr.add(accountCreateApiResponse.getRec().getAccountNo());
        arr.add(generateTimestampBasedClubCode()); // 클럽코드 생성
        arr.add(account.getPwd());

        accountRepository.saveAccount(arr);
    }

    @Override
    public Map<String, String> accountSelectNumberAndBalance(String clubCode) {
        Dotenv dotenv = Dotenv.load();
        String apiKey = dotenv.get("API_KEY");

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

    private String generateTimestampBasedClubCode() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

        // 랜덤한 3개의 대문자 추가
        String randomCode = generateRandomCode(3);

        return now.format(formatter) + randomCode;
    }

    private String generateRandomCode(int length) {
        String letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            sb.append(letters.charAt(random.nextInt(letters.length())));
        }
        return sb.toString();
    }

    private AccountCreateApiRequest createAccountRequest(Account account) {
        String ssafyUserKey = account.getSsafyUserKey();
        Dotenv dotenv = Dotenv.load();
        String apiKey = dotenv.get("API_KEY");

        // 고유한 Identifier 생성
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String formattedDate = now.format(dateFormatter);
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HHmmss");
        String formattedTime = now.format(timeFormatter);
        String milliseconds = String.format("%03d", now.getNano() / 1_000_000).substring(0, 2);
        String randomFourDigits = generateRandomFourDigits();
        String uniqueIdentifier = generateAutoIncrementNumber(formattedDate, formattedTime, milliseconds, randomFourDigits);

        // Header 생성
        Header header = Header.builder()
                .apiName("createDemandDepositAccount")
                .transmissionDate(formattedDate)
                .transmissionTime(formattedTime)
                .institutionCode("00100")
                .fintechAppNo("001")
                .apiServiceCode("createDemandDepositAccount")
                .institutionTransactionUniqueNo(uniqueIdentifier)
                .apiKey(apiKey)
                .userKey(ssafyUserKey)
                .build();

        // 전체 API 요청 객체 생성
        AccountCreateApiRequest accountCreateApiRequest = AccountCreateApiRequest.builder()
                .header(header)
                .accountTypeUniqueNo("001-1-7c1e096a0f2d40")
                .build();

        return accountCreateApiRequest;
    }

    private String generateRandomFourDigits() {
        Random random = new Random();
        return String.format("%04d", random.nextInt(10000));
    }

    private static synchronized String generateAutoIncrementNumber(String formattedDate, String formattedTime, String milliseconds, String randomFourDigits) {
        return formattedDate + formattedTime + milliseconds + randomFourDigits;
    }
}
