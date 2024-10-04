package com.ssafy.accountservice.account.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

@Data
public class AccountHistoryApiRequest {

    @JsonProperty("Header")  // JSON에서 "Header" 필드를 매핑
    private Header header;

    @JsonProperty("accountNo")  // JSON에서 "accountNo" 필드를 매핑
    private String accountNo;

    @JsonProperty("startDate")  // 거래 내역 조회 시작 날짜 (고정값)
    private final String startDate = "20240101"; // 기본값 제공

    @JsonProperty("endDate")  // 거래 내역 조회 종료 날짜 (고정값)
    private final String endDate = "20241231"; // 기본값 제공

    @JsonProperty("transactionType")  // 거래 유형 (예: A, 고정값)
    private final String transactionType = "A"; // 기본값 제공

    @JsonProperty("orderByType")  // 정렬 유형 (예: ASC, 고정값)
    private final String orderByType = "ASC"; // 기본값 제공

    // 기본 생성자에서 Header 객체 생성
    public AccountHistoryApiRequest() {
        this.header = new Header();  // header 객체를 기본적으로 생성
    }

    // 파라미터가 있는 생성자
    public AccountHistoryApiRequest(String userKey, String accountNo, String apiKey) {
        this.header = new Header(userKey, apiKey);  // header 객체를 생성 시 apiKey와 userKey를 전달
        this.accountNo = accountNo;
    }

    @Data
    public static class Header {
        @JsonProperty("apiName")
        private final String apiName;

        @JsonProperty("transmissionDate")
        private final String transmissionDate;

        @JsonProperty("transmissionTime")
        private final String transmissionTime;

        @JsonProperty("institutionCode")
        private final String institutionCode;

        @JsonProperty("fintechAppNo")
        private final String fintechAppNo;

        @JsonProperty("apiServiceCode")
        private final String apiServiceCode;

        @JsonProperty("institutionTransactionUniqueNo")
        private final String institutionTransactionUniqueNo;

        @JsonProperty("apiKey")
        private String apiKey;

        @JsonProperty("userKey")
        private String userKey;

        // 기본 생성자에서 상수 값 초기화
        public Header() {
            this.apiName = "inquireTransactionHistoryList";
            this.transmissionDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
            this.transmissionTime = LocalTime.now().format(DateTimeFormatter.ofPattern("HHmmss"));
            this.institutionCode = "00100";
            this.fintechAppNo = "001";
            this.apiServiceCode = "inquireTransactionHistoryList";
            this.institutionTransactionUniqueNo = generateUniqueIdentifier(); // 고유한 Identifier 생성
        }

        // 파라미터가 있는 생성자
        public Header(String userKey, String apiKey) {
            this(); // 기본 상수 초기화
            this.apiKey = apiKey;  // 생성자에서 apiKey 설정
            this.userKey = userKey;  // 생성자에서 userKey 설정
        }

        // 고유한 Identifier 생성 메서드
        private String generateUniqueIdentifier() {
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HHmmss");

            String formattedDate = now.format(dateFormatter);
            String formattedTime = now.format(timeFormatter);
            String milliseconds = String.format("%03d", now.getNano() / 1_000_000).substring(0, 2);
            String randomFourDigits = generateRandomFourDigits();

            return formattedDate + formattedTime + milliseconds + randomFourDigits;
        }

        // 4자리 랜덤 숫자 생성
        private String generateRandomFourDigits() {
            Random random = new Random();
            return String.format("%04d", random.nextInt(10000));
        }
    }
}
