package com.ssafy.accountservice.account.controller;

import com.ssafy.accountservice.account.controller.dto.request.*;
import com.ssafy.accountservice.account.infrastructure.repository.entity.AccountHistoryEntity;
import com.ssafy.accountservice.account.infrastructure.repository.entity.AccountHistoryMemo;
import com.ssafy.accountservice.account.infrastructure.repository.entity.IsVerificationInEntity;
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

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
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
    @GetMapping("/history/{tag_name}")
    public ResponseEntity<AccountHistoryEntity> getHistoryOnly(@PathVariable("tag_name") String tagName) {
        AccountHistoryEntity accountHistoryEntity = accountService.historyGetOnly(tagName);
        return new ResponseEntity<>(accountHistoryEntity, HttpStatus.CREATED);
    }


    @PostMapping(value = "/{tag_name}/verification", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "입출금 증빙 내역 생성", description = "이미지 파일과 메모를 업로드하여 증빙 내역을 생성한다.")
    public ResponseEntity<String> saveVerify(@PathVariable("tag_name") String tagName, @ModelAttribute VerificationRequest verificationRequest) {
        try {
            // 이미지 파일 업로드
            MultipartFile accountHistoryImage = verificationRequest.getAccountHistoryImage();
            String s3ImageUrl = null;

            // 이미지 파일이 있을 경우 S3에 업로드
            if (accountHistoryImage != null && !accountHistoryImage.isEmpty()) {
                String randomString = UUID.randomUUID().toString();
                String fileName = tagName + "_" + randomString;

                // S3에 파일 업로드
                s3Connector.upload(fileName, accountHistoryImage);

                // 업로드된 파일의 URL 가져오기
                s3ImageUrl = s3Connector.getImageURL(fileName);
            }

            // VerificationSaveRequest 객체 생성 후 값 설정
            VerificationSaveRequest verificationSaveRequest = new VerificationSaveRequest();
            verificationSaveRequest.setTagName(tagName);
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
    @GetMapping("{tag_name}/verification")
    public VerifyEntity selectVerification(@PathVariable("tag_name") String tagName) {
        return accountService.verifySelect(tagName);
    }


    @PutMapping(value = "/{tag_name}/verification", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "입출금 증빙 내역 업데이트", description = "이미지 파일과 메모를 업로드하여 증빙 내역을 업데이트한다.")
    public ResponseEntity<String> updateVerification(@PathVariable("tag_name") String tagName,
                                                     @ModelAttribute VerificationRequest verificationRequest) {

        // 1. 기존 데이터를 조회합니다.
        VerifyEntity existingData = accountService.verifySelect(tagName);

        // 2. 이미지 파일 처리
        MultipartFile newAccountHistoryImage = verificationRequest.getAccountHistoryImage();
        String s3ImageUrl = null;

        if (newAccountHistoryImage != null && !newAccountHistoryImage.isEmpty()) {
            String randomString = UUID.randomUUID().toString();
            String fileName = tagName + "_" + randomString;

            // S3에 파일 업로드
            s3Connector.upload(fileName, newAccountHistoryImage);

            // 업로드된 파일의 URL 가져오기
            s3ImageUrl = s3Connector.getImageURL(fileName);
        }

        // 3. VerificationSaveRequest 객체 생성 후 기존 데이터와 비교하여 변경된 값만 설정
        VerificationSaveRequest verificationSaveRequest = new VerificationSaveRequest();
        verificationSaveRequest.setTagName(tagName);

        // 기존 메모와 비교하여 변경된 경우에만 새로운 값 설정
        String newMemo = verificationRequest.getAccountHistoryMemo();
        if (newMemo != null && !newMemo.equals(existingData.getAccountHistoryMemo())) {
            verificationSaveRequest.setAccountHistoryMemo(newMemo);
        } else {
            verificationSaveRequest.setAccountHistoryMemo(existingData.getAccountHistoryMemo());
        }

        // 새 이미지 URL이 있을 경우에만 설정, 없으면 기존 값 유지
        if (s3ImageUrl != null) {
            verificationSaveRequest.setAccountHistoryImage(s3ImageUrl);
        } else {
            verificationSaveRequest.setAccountHistoryImage(existingData.getAccountHistoryImage());
        }

        // 4. 검증 데이터를 업데이트하는 서비스 호출
        accountService.verifyUpdate(verificationSaveRequest);

        return ResponseEntity.ok("업데이트에 성공했습니다");
    }


    @Operation(summary = "입출금 증빙 내역 삭제")
    @DeleteMapping("/{tag_name}/verification")
    public ResponseEntity<String> deleteVerification(@PathVariable("tag_name") String tagName) {
        accountService.verifyDelete(tagName);
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

    @Operation(summary = "날짜로 비교해서 회비 낸 명단 제공", description = "날짜형식은 yyyymm")
    @GetMapping("/{clubCode}/{date}/comparedate")
    public List<String> compareDate(@PathVariable("clubCode") String clubCode, @PathVariable("date") String date) {
        return accountService.dateCompare(clubCode,date);
    }

//    @Operation(summary = "증빙 내역에 없으면 생성 후 수정")
//    @PostMapping("/{tag_name}/isverificationin")
//    public void createVerification(@PathVariable("tag_name") String tagName) {
//        accountService.isVerificationIn(tagName);
//    }

    @Operation(summary = "증빙 내역에 없으면 생성 후 수정")
    @PostMapping("/isverificationin")
    public void createVerification(@RequestBody IsVerificationInEntity isVerificationInEntity) {
        String tagName = isVerificationInEntity.getTagName();
        accountService.isVerificationIn(tagName);
    }

    @PutMapping(value = "/{tag_name}/verificationmemo")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "입출금 증빙 내역 업데이트 - 메모", description = "입출금 증빙 내역의 메모를 업데이트한다.")
    public ResponseEntity<String> updateVerificationMemo(@PathVariable("tag_name") String tagName,
                                                         @RequestParam(required = false) String accountHistoryMemo) {

        // accountHistoryMemo가 null이면 빈 문자열로 설정
        if (accountHistoryMemo == null) {
            accountHistoryMemo = "";
        }

        // 서비스 호출하여 메모 업데이트
        accountService.verifyUpdateMemo(tagName, accountHistoryMemo);

        return ResponseEntity.ok("업데이트에 성공했습니다");
    }

    @PutMapping(value = "/{tag_name}/verificationimage", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "입출금 증빙 내역 업데이트 - 이미지", description = "이미지 파일과 메모를 업로드하여 증빙 내역을 업데이트한다.")
    public ResponseEntity<String> updateVerificationImage(@PathVariable("tag_name") String tagName,
                                                     @ModelAttribute VerificationRequestImage verificationRequestImage) {

        // 2. 이미지 파일 처리
        MultipartFile newAccountHistoryImage = verificationRequestImage.getAccountHistoryImage();
        String s3ImageUrl = "";

        if (newAccountHistoryImage != null && !newAccountHistoryImage.isEmpty()) {
            String randomString = UUID.randomUUID().toString();
            String fileName = tagName + "_" + randomString;

            // S3에 파일 업로드
            s3Connector.upload(fileName, newAccountHistoryImage);

            // 업로드된 파일의 URL 가져오기
            s3ImageUrl = s3Connector.getImageURL(fileName);
        }

        if (s3ImageUrl == null) {
            s3ImageUrl = ""; // null일 경우 빈 문자열로 처리
        }

        // 3. 서비스 로직
        accountService.verifyUpdateImage(tagName, s3ImageUrl);

        return ResponseEntity.ok("업데이트에 성공했습니다");
    }
}