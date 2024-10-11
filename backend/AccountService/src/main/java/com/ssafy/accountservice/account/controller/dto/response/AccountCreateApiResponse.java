package com.ssafy.accountservice.account.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AccountCreateApiResponse {

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

        @JsonProperty("accountNo")
        private String accountNo;

        @JsonProperty("currency")
        private Currency currency;

        @Data
        public static class Currency {
            @JsonProperty("currency")
            private String currency;

            @JsonProperty("currencyName")
            private String currencyName;
        }
    }
}
