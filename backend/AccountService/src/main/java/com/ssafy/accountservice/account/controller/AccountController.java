package com.ssafy.accountservice.account.controller;

import com.ssafy.accountservice.account.controller.dto.request.*;
import com.ssafy.accountservice.account.infrastructure.repository.entity.AccountHistoryEntity;
import com.ssafy.accountservice.account.infrastructure.repository.entity.DateEntity;
import com.ssafy.accountservice.account.infrastructure.repository.entity.VerifyEntity;
import com.ssafy.accountservice.account.infrastructure.s3.S3Connector;
import com.ssafy.accountservice.account.mapper.AccountObjectMapper;
import com.ssafy.accountservice.account.service.AccountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Tag(name = "Account API", description = "계좌 생성 API")
@RequiredArgsConstructor
@RequestMapping("/api/account")
@RestController
public class AccountController {
    private final S3Connector s3Connector;
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
        if (accountData == null || accountData.isEmpty()) {
            accountData = new HashMap<>();
            accountData.put("account_num", "1111111111111111");
            accountData.put("account_balance", "0");
            return new ResponseEntity<>(accountData, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(accountData, HttpStatus.OK);
        }
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


    @Operation(summary = "계좌 내역 단일 조회")
    @GetMapping("/history/{ssafy_transaction_number}")
    public ResponseEntity<AccountHistoryEntity> getHistoryOnly(@PathVariable("ssafy_transaction_number") String ssafyTransactionNumber) {
        AccountHistoryEntity accountHistoryEntity = accountService.historyGetOnly(ssafyTransactionNumber);
        return new ResponseEntity<>(accountHistoryEntity, HttpStatus.CREATED);
    }


    @PostMapping(value = "/{ssafy_transaction_number}/verification", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "입출금 증빙 내역 생성", description = "이미지 파일과 메모를 업로드하여 증빙 내역을 생성한다.")
    public ResponseEntity<String> saveVerify(@PathVariable("ssafy_transaction_number") String ssafyTransactionNumber, @ModelAttribute VerificationRequest verificationRequest) {
        try {
            // 이미지 파일 업로드
            MultipartFile accountHistoryImage = verificationRequest.getAccountHistoryImage();
            String s3ImageUrl = null;

            // 이미지 파일이 있을 경우 S3에 업로드
            if (accountHistoryImage != null && !accountHistoryImage.isEmpty()) {
                String randomString = UUID.randomUUID().toString();
                String fileName = ssafyTransactionNumber + "_" + randomString;

                // S3에 파일 업로드
                s3Connector.upload(fileName, accountHistoryImage);

                // 업로드된 파일의 URL 가져오기
                s3ImageUrl = s3Connector.getImageURL(fileName);
            }

            // VerificationSaveRequest 객체 생성 후 값 설정
            VerificationSaveRequest verificationSaveRequest = new VerificationSaveRequest();
            verificationSaveRequest.setSsafyTransactionNumber(ssafyTransactionNumber);
            verificationSaveRequest.setAccountHistoryMemo(verificationRequest.getAccountHistoryMemo());
            verificationSaveRequest.setAccountHistoryImage(s3ImageUrl);  // MultipartFile 대신 S3 URL 저장

            // 검증 데이터를 저장하는 서비스 호출
            accountService.verifySave(verificationSaveRequest);

            return ResponseEntity.ok("저장에 성공했습니다");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("예기치 못한 오류가 발생했습니다.");
        }
    }


    @Operation(summary = "입출금 증빙 내역 조회")
    @GetMapping("{ssafy_transaction_number}/verification")
    public VerifyEntity selectVerification(@PathVariable("ssafy_transaction_number") String ssafyTransactionNumber) {
        return accountService.verifySelect(ssafyTransactionNumber);
    }


    @PutMapping(value = "/{ssafy_transaction_number}/verification", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "입출금 증빙 내역 업데이트", description = "이미지 파일과 메모를 업로드하여 증빙 내역을 업데이트한다.")
    public ResponseEntity<String> updateVerification(@PathVariable("ssafy_transaction_number") String ssafyTransactionNumber,
                                                     @ModelAttribute VerificationRequest verificationRequest) {
        try {
            // 이미지 파일 업로드
            MultipartFile newAccountHistoryImage = verificationRequest.getAccountHistoryImage();
            String s3ImageUrl = null;

            // 이미지 파일이 있을 경우 S3에 업로드
            if (newAccountHistoryImage != null && !newAccountHistoryImage.isEmpty()) {
                String randomString = UUID.randomUUID().toString();
                String fileName = ssafyTransactionNumber + "_" + randomString;

                // S3에 파일 업로드
                s3Connector.upload(fileName, newAccountHistoryImage);

                // 업로드된 파일의 URL 가져오기
                s3ImageUrl = s3Connector.getImageURL(fileName);
            }

            // VerificationSaveRequest 객체 생성 후 값 설정
            VerificationSaveRequest verificationSaveRequest = new VerificationSaveRequest();
            verificationSaveRequest.setSsafyTransactionNumber(ssafyTransactionNumber);
            verificationSaveRequest.setAccountHistoryMemo(verificationRequest.getAccountHistoryMemo());

            // 새 이미지 URL이 있을 경우에만 설정
            if (s3ImageUrl != null) {
                verificationSaveRequest.setAccountHistoryImage(s3ImageUrl);
            }

            // 검증 데이터를 업데이트하는 서비스 호출
            accountService.verifyUpdate(ssafyTransactionNumber, verificationSaveRequest);

            return ResponseEntity.ok("업데이트에 성공했습니다");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("업데이트 중 오류가 발생했습니다: " + e.getMessage());
        }
    }


    @Operation(summary = "입출금 증빙 내역 삭제")
    @DeleteMapping("/{ssafy_transaction_number}/verification")
    public ResponseEntity<String> deleteVerification(@PathVariable("ssafy_transaction_number") String ssafyTransactionNumber) {
        accountService.verifyDelete(ssafyTransactionNumber);
        return ResponseEntity.ok("삭제에 성공했습니다");
    }


    @Operation(summary = "멤버 id로 잔액 조회하기")
    @GetMapping("/{member_id}/accountBalance")
    public Map<String, String> memberIdAccountBalance(@PathVariable("member_id") Long memberId) {
        return accountService.accountBalanceMemberId(memberId);
    }


    @Operation(summary = "날짜로 입출금 내역 조회")
    @GetMapping("/{clubCode}/{date}/historybydate")
    public ResponseEntity<List<AccountHistoryEntity>> historyAccountByDate(@PathVariable("clubCode") String clubCode, @PathVariable("date") String date) {
        List<AccountHistoryEntity> response = accountService.accountHistoryByDate(clubCode, date);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "클럽에 존재하는 태그 이름 모두 조회")
    @GetMapping("/{clubCode}/tagname")
    public List<String> selectTagName(@PathVariable("clubCode") String clubCode) {
        return accountService.tagNameSelect(clubCode);
    }

    @Operation(summary = "날짜로 비교해서 회비 낸 명단 제공", description = "날짜형식은 yyyy-dd")
    @GetMapping("/{clubCode}/{date}/comparedate")
    public List<String> compareDate(@PathVariable("clubCode") String clubCode, @PathVariable("date") String date) {
        return accountService.dateCompare(clubCode,date);
    }
}