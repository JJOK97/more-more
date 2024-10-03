package com.ssafy.accountservice.account.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UseCardApiResponse {

    @JsonProperty("Header")
    private Header header;

    @JsonProperty("REC")
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
        @JsonProperty("transactionUniqueNo")
        private String transactionUniqueNo;

        @JsonProperty("categoryId")
        private String categoryId;

        @JsonProperty("categoryName")
        private String categoryName;

        @JsonProperty("merchantId")
        private String merchantId;

        @JsonProperty("merchantName")
        private String merchantName;

        @JsonProperty("transactionDate")
        private String transactionDate;

        @JsonProperty("transactionTime")
        private String transactionTime;

        @JsonProperty("paymentBalance")
        private String paymentBalance;
    }
}
