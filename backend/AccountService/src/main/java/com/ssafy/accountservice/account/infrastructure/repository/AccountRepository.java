package com.ssafy.accountservice.account.infrastructure.repository;

import java.util.ArrayList;
import java.util.Map;

public interface AccountRepository {
    void saveAccount(ArrayList<String> arrayList);
    Map<String, String> selectAccountNumber(String clubCode);
}
