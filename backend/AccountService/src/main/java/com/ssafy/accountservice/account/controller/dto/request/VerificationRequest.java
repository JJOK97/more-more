package com.ssafy.accountservice.account.controller.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class VerificationRequest {
    private String accountHistoryMemo;   // 계좌내역 메모
    private String accountHistoryImage;  // 계좌내역증빙 이미지
}