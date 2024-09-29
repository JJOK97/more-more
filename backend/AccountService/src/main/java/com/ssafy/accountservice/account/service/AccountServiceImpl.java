package com.ssafy.accountservice.account.service;

import com.ssafy.accountservice.account.controller.dto.request.AccountCreateApiRequest;
import com.ssafy.accountservice.account.controller.dto.request.AccountCreateApiRequest.Header;
import com.ssafy.accountservice.account.controller.dto.response.AccountCreateApiResponse;
import com.ssafy.accountservice.account.infrastructure.repository.AccountRepository;
import com.ssafy.accountservice.account.service.domain.Account;
import com.ssafy.accountservice.client.AccountFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final AccountFeignClient accountFeignClient;

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
                .apiKey("41ab6a7e28bf4af7b799e70ef9441967")
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
