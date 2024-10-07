package com.ssafy.accountservice.account.service.domain;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Value;

public class AccountUtils {
    @Value("${ssafy.api.key}")
    private static String API_KEY;
    @Value("${ssafy.user.key}")
    private static String USER_KEY;
    @Value("${ssafy.account.no}")
    private static String ACCOUNT_NO;
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
