package com.ssafy.accountservice.account.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
public class AccountCreateApiRequest {

    @JsonProperty("Header")  // JSON에서 "Header" 필드를 매핑
    private Header header;

    @JsonProperty("accountTypeUniqueNo")  // JSON에서 "accountTypeUniqueNo" 필드를 매핑
    private String accountTypeUniqueNo;

    @Builder
    public AccountCreateApiRequest(Header header, String accountTypeUniqueNo) {
        this.header = header;
        this.accountTypeUniqueNo = accountTypeUniqueNo;
    }

    @Data
    public static class Header {
        @JsonProperty("apiName")  // JSON에서 "apiName" 필드를 매핑
        private String apiName;

        @JsonProperty("transmissionDate")  // JSON에서 "transmissionDate" 필드를 매핑
        private String transmissionDate;

        @JsonProperty("transmissionTime")  // JSON에서 "transmissionTime" 필드를 매핑
        private String transmissionTime;

        @JsonProperty("institutionCode")  // JSON에서 "institutionCode" 필드를 매핑
        private String institutionCode;

        @JsonProperty("fintechAppNo")  // JSON에서 "fintechAppNo" 필드를 매핑
        private String fintechAppNo;

        @JsonProperty("apiServiceCode")  // JSON에서 "apiServiceCode" 필드를 매핑
        private String apiServiceCode;

        @JsonProperty("institutionTransactionUniqueNo")  // JSON에서 "institutionTransactionUniqueNo" 필드를 매핑
        private String institutionTransactionUniqueNo;

        @JsonProperty("apiKey")  // JSON에서 "apiKey" 필드를 매핑
        private String apiKey;

        @JsonProperty("userKey")  // JSON에서 "userKey" 필드를 매핑
        private String userKey;

        @Builder
        public Header(String apiName, String transmissionDate, String transmissionTime, String institutionCode, String fintechAppNo, String apiServiceCode, String institutionTransactionUniqueNo, String apiKey, String userKey) {
            this.apiName = apiName;
            this.transmissionDate = transmissionDate;
            this.transmissionTime = transmissionTime;
            this.institutionCode = institutionCode;
            this.fintechAppNo = fintechAppNo;
            this.apiServiceCode = apiServiceCode;
            this.institutionTransactionUniqueNo = institutionTransactionUniqueNo;
            this.apiKey = apiKey;
            this.userKey = userKey;
        }
    }
}
