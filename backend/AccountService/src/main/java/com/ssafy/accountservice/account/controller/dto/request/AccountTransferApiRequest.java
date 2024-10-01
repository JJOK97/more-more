package com.ssafy.accountservice.account.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

@Data
public class AccountTransferApiRequest {

    @JsonProperty("Header")  // JSON에서 "Header" 필드를 매핑
    private Header header;

    @JsonProperty("depositAccountNo")  // 입금 계좌 번호
    private String depositAccountNo;

    @JsonProperty("depositTransactionSummary")  // 입금 거래 요약 (고정값)
    private final String depositTransactionSummary = "(수시입출금) : 입금(이체)";

    @JsonProperty("transactionBalance")  // 거래 금액
    private String transactionBalance;

    @JsonProperty("withdrawalAccountNo")  // 출금 계좌 번호
    private String withdrawalAccountNo;

    @JsonProperty("withdrawalTransactionSummary")  // 출금 거래 요약 (고정값)
    private final String withdrawalTransactionSummary = "(수시입출금) : 출금(이체)";

    // 기본 생성자에서 Header 객체 생성
    public AccountTransferApiRequest() {
        this.header = new Header();  // 기본적으로 header 객체를 생성
    }

    // 매개변수가 있는 생성자
    public AccountTransferApiRequest(String userKey, String depositAccountNo, String transactionBalance, String withdrawalAccountNo) {
        this();  // 기본 생성자 호출해서 header 생성
        this.header.setUserKey(userKey);  // 동적으로 설정된 userKey
        this.depositAccountNo = depositAccountNo;
        this.transactionBalance = transactionBalance;
        this.withdrawalAccountNo = withdrawalAccountNo;
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
            this.apiName = "updateDemandDepositAccountTransfer";
            this.transmissionDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
            this.transmissionTime = LocalTime.now().format(DateTimeFormatter.ofPattern("HHmmss"));
            this.institutionCode = "00100";
            this.fintechAppNo = "001";
            this.apiServiceCode = "updateDemandDepositAccountTransfer";
            this.institutionTransactionUniqueNo = generateUniqueIdentifier(); // 고유한 Identifier 생성
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

