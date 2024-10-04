package com.ssafy.accountservice.account.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class AccountTransferApiResponse {

    @JsonProperty("Header")
    private Header header;

    @JsonProperty("REC")
    private List<REC> rec;

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

        @JsonProperty("accountNo")
        private String accountNo;

        @JsonProperty("transactionDate")
        private String transactionDate;

        @JsonProperty("transactionType")
        private String transactionType;

        @JsonProperty("transactionTypeName")
        private String transactionTypeName;

        @JsonProperty("transactionAccountNo")
        private String transactionAccountNo;
    }
}
