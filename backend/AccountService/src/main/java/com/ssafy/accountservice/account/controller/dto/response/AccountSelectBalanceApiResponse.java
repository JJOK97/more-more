package com.ssafy.accountservice.account.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AccountSelectBalanceApiResponse {

    @JsonProperty("Header")  // JSON에서 "Header"라는 필드를 "header"에 매핑
    private Header header;

    @JsonProperty("REC")  // JSON에서 "REC"라는 필드를 "rec"에 매핑
    private REC rec;

    @Data
    public static class Header {
        @JsonProperty("responseCode")
        private String responseCode;

        @JsonProperty("responseMessage")
        private String responseMessage;

        @JsonProperty("apiName")
        private String apiName;

        @JsonProperty("transmissionDate")
        private String transmissionDate;

        @JsonProperty("transmissionTime")
        private String transmissionTime;

        @JsonProperty("institutionCode")
        private String institutionCode;

        @JsonProperty("apiKey")
        private String apiKey;

        @JsonProperty("apiServiceCode")
        private String apiServiceCode;

        @JsonProperty("institutionTransactionUniqueNo")
        private String institutionTransactionUniqueNo;
    }

    @Data
    public static class REC {
        @JsonProperty("bankCode")
        private String bankCode;

        @JsonProperty("bankName")
        private String bankName;

        @JsonProperty("userName")
        private String userName;

        @JsonProperty("accountNo")
        private String accountNo;

        @JsonProperty("accountName")
        private String accountName;

        @JsonProperty("accountTypeCode")
        private String accountTypeCode;

        @JsonProperty("accountTypeName")
        private String accountTypeName;

        @JsonProperty("accountCreatedDate")
        private String accountCreatedDate;

        @JsonProperty("accountExpiryDate")
        private String accountExpiryDate;

        @JsonProperty("dailyTransferLimit")
        private String dailyTransferLimit;

        @JsonProperty("oneTimeTransferLimit")
        private String oneTimeTransferLimit;

        @JsonProperty("accountBalance")
        private String accountBalance;

        @JsonProperty("lastTransactionDate")
        private String lastTransactionDate;

        @JsonProperty("currency")
        private String currency;
    }
}