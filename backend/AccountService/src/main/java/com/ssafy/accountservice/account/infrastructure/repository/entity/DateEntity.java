package com.ssafy.accountservice.account.infrastructure.repository.entity;

import lombok.Data;

@Data
public class DateEntity {
    private String accountNum;
    private String startDate;
    private String endDate;
    private String dues;
}
