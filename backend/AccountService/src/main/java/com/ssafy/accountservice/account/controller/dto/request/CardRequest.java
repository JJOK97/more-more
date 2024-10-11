package com.ssafy.accountservice.account.controller.dto.request;

import lombok.Data;

@Data
public class CardRequest {
    private String cardNo;
    private String cvc;
    private String merchantId;
    private String paymentBalance;
}
