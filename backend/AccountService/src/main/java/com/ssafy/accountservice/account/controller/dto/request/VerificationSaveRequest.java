package com.ssafy.accountservice.account.controller.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class VerificationSaveRequest {
    private Long accountHistoryImageId; // 자동 생성되는 계좌내역 이미지 ID
    private String ssafyTransactionNumber;
    private String accountHistoryMemo;
    private String accountHistoryImage;  // 계좌내역증빙 이미지
}
