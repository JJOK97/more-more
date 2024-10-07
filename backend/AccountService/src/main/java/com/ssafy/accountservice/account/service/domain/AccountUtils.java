package com.ssafy.accountservice.account.service.domain;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AccountUtils {
    private static String API_KEY;
    private static String USER_KEY;
    private static String ACCOUNT_NO;

    @Value("${ssafy.api.key}")
    public void setApiKEY(String API_KEY) {
        this.API_KEY = API_KEY;
    }

    @Value("${ssafy.user.key}")
    public void setUserKEY(String USER_KEY) {
        this.USER_KEY = USER_KEY;
    }

    @Value("${ssafy.account.number}")
    public void setAccountNo(String ACCOUNT_N) {
        this.ACCOUNT_NO = ACCOUNT_N;
    }

    public static String getApiKey() {
        return API_KEY;
    }

    public static String getUserKey() {
        return USER_KEY;
    }

    public static String getAccountNo() {
        return ACCOUNT_NO;
    }
}
