package com.ssafy.accountservice.account.mapper;

import com.ssafy.accountservice.account.controller.dto.request.AccountCreateRequest;
import com.ssafy.accountservice.account.controller.dto.request.AccountSelectNumberAndBalanceRequest;
import com.ssafy.accountservice.account.infrastructure.repository.entity.AccountEntity;
import com.ssafy.accountservice.account.service.domain.Account;
import com.ssafy.accountservice.account.service.domain.AccountNumAndBalanceSelect;
import org.mapstruct.Mapper;

import java.util.ArrayList;

@Mapper(componentModel = "spring")
public interface AccountObjectMapper {

    Account fromCreateRequestToDomain(AccountCreateRequest accountCreateRequest);

    default AccountEntity fromDomainToEntity(ArrayList<String> arrayList) {
        if (arrayList == null || arrayList.size() < 3) {
            throw new IllegalArgumentException("ArrayList does not contain enough elements");
        }

        return AccountEntity.builder()
                .ssafyAccountNumber(arrayList.get(0))
                .clubCode(arrayList.get(1))
                .clubPassword(arrayList.get(2))
                .build();
    }
}
