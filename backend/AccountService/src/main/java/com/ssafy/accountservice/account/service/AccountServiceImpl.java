package com.ssafy.accountservice.account.service;

import com.ssafy.accountservice.account.controller.dto.request.*;
import com.ssafy.accountservice.account.controller.dto.response.*;
import com.ssafy.accountservice.account.infrastructure.repository.AccountRepository;
import com.ssafy.accountservice.account.infrastructure.repository.entity.AccountHistoryEntity;
import com.ssafy.accountservice.account.service.domain.Account;
import com.ssafy.accountservice.account.service.domain.AccountHistoryAll;
import com.ssafy.accountservice.account.service.domain.AccountTransfer;
import com.ssafy.accountservice.account.service.domain.AccountUtils;
import com.ssafy.accountservice.client.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final AccountFeignClient accountFeignClient;
    private final SelectAccountNumFeignClient selectAccountNumFeignClient;
    private final AccountTransferFeignClient accountTransferFeignClient;
    private final UseCardFeignClient useCardFeignClient;

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

        // Feign Client
        AccountTransferApiResponse accountTransferApiResponse = accountTransferFeignClient.transferAccountBalance(accountTransferApiRequest);
        AccountTransferApiResponse.REC firstRec = accountTransferApiResponse.getRec().get(0);

        // 계좌 잔고 들고 오는 로직
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
        String accountBalance = balanceResponse.getRec().getAccountBalance();

        // 받는 계좌
        String depositAccountNo = firstRec.getTransactionAccountNo();

        // 송금 금액
        String transactionBalance = accountTransfer.getTransactionBalance();

        // 이체 정보를 기록할 ArrayList
        ArrayList<String> arr = new ArrayList<>();
        arr.add(accountBalance);
        arr.add(depositAccountNo);
        arr.add(transactionBalance);

        // account_history 테이블에 저장할 AccountHistoryAll 객체 생성 및 데이터 설정
        AccountHistoryAll accountHistoryAll = new AccountHistoryAll();
        accountHistoryAll.setAccountId(Long.valueOf(balanceResponse.getRec().getAccountNo()));   // 계좌 ID
        accountHistoryAll.setTagName(LocalDate.now() + "." + firstRec.getTransactionType());  // 결제 태그
        accountHistoryAll.setSsafyTransactionNumber(balanceResponse.getHeader().getInstitutionTransactionUniqueNo());  // SSAFY 거래번호
        accountHistoryAll.setPaymentType(firstRec.getTransactionTypeName());       // 결제 타입
        accountHistoryAll.setPaymentAmount(transactionBalance);   // 송금 금액
        accountHistoryAll.setAccountBalance(accountBalance);      // 계좌 잔액
//        accountHistoryAll.setAccountHistoryVerificationContent();  // 증빙 내용

        // accountRepository를 사용해 account_history 테이블에 내역 저장
        accountRepository.insertAccountHistory(accountHistoryAll);

        return arr;
    }


    @Override
    public ArrayList<String> accountFill(AccountTransferFillRequest accountTransferFillRequest) {
        String apiKey = AccountUtils.getApiKey();

        // 클럽 코드로 계좌 번호 조회 (입금 계좌)
        String depositAccountNo = accountRepository.selectAccountNumber(accountTransferFillRequest.getClubCode());

        // 이체 API 요청 준비
        AccountTransferApiRequest accountTransferApiRequest = new AccountTransferApiRequest();
        accountTransferApiRequest.getHeader().setApiKey(apiKey);
        accountTransferApiRequest.getHeader().setUserKey(accountTransferFillRequest.getUserKey());
        accountTransferApiRequest.setDepositAccountNo(depositAccountNo);  // 입금 계좌
        accountTransferApiRequest.setTransactionBalance(accountTransferFillRequest.getTransactionBalance());
        accountTransferApiRequest.setWithdrawalAccountNo(accountTransferFillRequest.getWithdrawalAccountNo()); // 출금 계좌

        // Feign Client 사용하여 이체 API 호출
        AccountTransferApiResponse accountTransferApiResponse = accountTransferFeignClient.transferAccountBalance(accountTransferApiRequest);
        AccountTransferApiResponse.REC secondRec = accountTransferApiResponse.getRec().get(1);

        // 입금 계좌 정보 및 송금 내역 저장
        ArrayList<String> arr = new ArrayList<>();
        arr.add(secondRec.getTransactionAccountNo());  // 입금 계좌
        arr.add(accountTransferFillRequest.getTransactionBalance());    // 이체 금액

        // 계좌 잔고 조회 로직
        Map<String, String> map = accountRepository.selectAccountNumberAndUserKey(accountTransferFillRequest.getClubCode());
        String managerKey = map.get("ssafy_user_key");
        String accountNum = map.get("ssafy_account_number");

        AccountSelectApiRequest accountSelectApiRequest = new AccountSelectApiRequest();
        accountSelectApiRequest.getHeader().setApiKey(apiKey);
        accountSelectApiRequest.getHeader().setUserKey(managerKey);
        accountSelectApiRequest.setAccountNo(accountNum);

        // Feign Client로 잔고 조회
        AccountSelectBalanceApiResponse balanceResponse = selectAccountNumFeignClient.selectAccountBalance(accountSelectApiRequest);

        // 잔고 추가
        arr.add(balanceResponse.getRec().getAccountBalance());

        // 이체 내역을 기록할 AccountHistoryAll 객체 생성
        AccountHistoryAll accountHistoryAll = new AccountHistoryAll();
        accountHistoryAll.setAccountId(Long.valueOf(balanceResponse.getRec().getAccountNo()));  // 계좌 ID
        accountHistoryAll.setTagName(LocalDate.now() + "." + secondRec.getTransactionType());  // 결제 태그
        accountHistoryAll.setSsafyTransactionNumber(balanceResponse.getHeader().getInstitutionTransactionUniqueNo());  // SSAFY 거래번호
        accountHistoryAll.setPaymentType(secondRec.getTransactionTypeName()); // 결제 타입
        accountHistoryAll.setPaymentAmount(accountTransferFillRequest.getTransactionBalance()); // 이체 금액
        accountHistoryAll.setAccountBalance(balanceResponse.getRec().getAccountBalance());  // 계좌 잔고

        // accountRepository를 통해 내역 저장
        accountRepository.insertAccountHistory(accountHistoryAll);

        return arr;
    }


    @Override
    public List<AccountHistoryEntity> accountHistory(String clubCode) {
        String accountNum = accountRepository.selectAccountNum(clubCode);
        return accountRepository.selectAccountHistory(accountNum);
    }


    public String cardUse(CardRequest cardRequest) {
        // pg DB이용하여 클럽코드 가져옴

        String apiKey = AccountUtils.getApiKey();
        String pgUserKey = AccountUtils.getUserKey();
        String accountNo = AccountUtils.getAccountNo();
        System.out.println("accountNo = " + accountNo);
        System.out.println("apiKey = " + apiKey);
        System.out.println("pgUserKey = " + pgUserKey);
        String clubCode = accountRepository.useAccountPg(cardRequest.getCardNo());

        // 모임코드 들고 왔을 때, 해당 모임의 총무 api key를 넣어서 조회
        Map<String, String> map = accountRepository.selectAccountNumberAndUserKey(clubCode);

        String managerKey = map.get("ssafy_user_key");
        String accountNum = map.get("ssafy_account_number");

        AccountSelectApiRequest accountSelectApiRequest = new AccountSelectApiRequest();
        accountSelectApiRequest.getHeader().setApiKey(apiKey);
        accountSelectApiRequest.getHeader().setUserKey(managerKey);
        accountSelectApiRequest.setAccountNo(accountNum);

        // Feign Client를 통해 계좌 잔액 조회
        AccountSelectBalanceApiResponse response = selectAccountNumFeignClient.selectAccountBalance(accountSelectApiRequest);

        // 결제 금액보다 계좌 잔고가 클 경우
        Long accountBalance = Long.valueOf(response.getRec().getAccountBalance());
        Long cardPayment = Long.valueOf(cardRequest.getPaymentBalance());

        if (accountBalance >= cardPayment) {
            // PG사로 송금
            AccountTransferApiRequest accountTransferApiRequest = new AccountTransferApiRequest();
            accountTransferApiRequest.getHeader().setApiKey(apiKey);
            accountTransferApiRequest.getHeader().setUserKey(managerKey);
            accountTransferApiRequest.setDepositAccountNo(accountNo);
            accountTransferApiRequest.setTransactionBalance(cardRequest.getPaymentBalance());
            accountTransferApiRequest.setWithdrawalAccountNo(accountNum);

            // Feign Client - 모임 계좌에서 PG로 돈 이동
            accountTransferFeignClient.transferAccountBalance(accountTransferApiRequest);

            // 카드 결제 진행
            UseCardApiRequest useCardApiRequest = new UseCardApiRequest();
            useCardApiRequest.getHeader().setApiKey(apiKey);
            useCardApiRequest.getHeader().setUserKey(pgUserKey);
            useCardApiRequest.setCardNo(cardRequest.getCardNo());
            useCardApiRequest.setCvc(cardRequest.getCvc());
            useCardApiRequest.setMerchantId(cardRequest.getMerchantId());
            useCardApiRequest.setPaymentBalance(cardRequest.getPaymentBalance());

            UseCardApiResponse useCardApiResponse = useCardFeignClient.useCardByPg(useCardApiRequest);

            // 카드 결제 내역을 DB에 저장
            AccountHistoryAll accountHistoryAll = new AccountHistoryAll();
            accountHistoryAll.setAccountId(Long.valueOf(response.getRec().getAccountNo()));  // 계좌 ID
            accountHistoryAll.setTagName(LocalDate.now() + "." + useCardApiResponse.getRec().getMerchantName());  // 결제 태그
            accountHistoryAll.setSsafyTransactionNumber(useCardApiResponse.getHeader().getInstitutionTransactionUniqueNo());  // SSAFY 거래번호
            accountHistoryAll.setPaymentType(useCardApiResponse.getRec().getMerchantName());  // 결제 타입
            accountHistoryAll.setPaymentAmount(useCardApiResponse.getRec().getPaymentBalance());  // 결제 금액
            accountHistoryAll.setAccountBalance(response.getRec().getAccountBalance());  // 계좌 잔고

            // accountRepository를 통해 내역 저장
            accountRepository.insertAccountHistory(accountHistoryAll);

            // 결제 성공 메시지 반환
            return "결제가 성공적으로 완료되었습니다.";
        } else {
            // 결제 실패 (잔액 부족)
            return "결제 실패: 잔액이 부족합니다.";
        }
    }
}