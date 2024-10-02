package com.ssafy.accountservice.account.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class AccountHistoryApiResponse {

    @JsonProperty("Header")  // JSON에서 "Header" 필드를 매핑
    private Header header;

    @JsonProperty("REC")  // JSON에서 "REC" 필드를 매핑
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
        @JsonProperty("totalCount")
        private String totalCount;

        @JsonProperty("list")  // 거래 내역 리스트
        private List<Transaction> list;

        @Data
        public static class Transaction {
            @JsonProperty("transactionUniqueNo")
            private String transactionUniqueNo;

            @JsonProperty("transactionDate")
            private String transactionDate;

            @JsonProperty("transactionTime")
            private String transactionTime;

            @JsonProperty("transactionType")
            private String transactionType;

            @JsonProperty("transactionTypeName")
            private String transactionTypeName;

            @JsonProperty("transactionAccountNo")
            private String transactionAccountNo;

            @JsonProperty("transactionBalance")
            private String transactionBalance;

            @JsonProperty("transactionAfterBalance")
            private String transactionAfterBalance;

            @JsonProperty("transactionSummary")
            private String transactionSummary;

            @JsonProperty("transactionMemo")
            private String transactionMemo;
        }
    }
}
