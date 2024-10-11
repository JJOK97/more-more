package com.ssafy.accountservice.account.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

@Data
public class UseCardApiRequest {

    @JsonProperty("Header")
    private Header header;

    @JsonProperty("cardNo")
    private String cardNo;

    @JsonProperty("cvc")
    private String cvc;

    @JsonProperty("merchantId")
    private String merchantId;

    @JsonProperty("paymentBalance")
    private String paymentBalance;

    // 기본 생성자에서 Header 객체 생성
    public UseCardApiRequest() {
        this.header = new Header();  // 기본적으로 header 객체를 생성
    }

    // 매개변수가 있는 생성자
    public UseCardApiRequest(String cardNo, String cvc, String merchantId, String paymentBalance, String userKey) {
        this();  // 기본 생성자 호출해서 header 생성
        this.header.setUserKey(userKey);  // 동적으로 설정된 userKey
        this.cardNo = cardNo;
        this.cvc = cvc;
        this.merchantId = merchantId;
        this.paymentBalance = paymentBalance;
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
            this.apiName = "createCreditCardTransaction";
            this.transmissionDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
            this.transmissionTime = LocalTime.now().format(DateTimeFormatter.ofPattern("HHmmss"));
            this.institutionCode = "00100";
            this.fintechAppNo = "001";
            this.apiServiceCode = "createCreditCardTransaction";
            this.institutionTransactionUniqueNo = generateUniqueIdentifier();  // 고유한 Identifier 생성
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

