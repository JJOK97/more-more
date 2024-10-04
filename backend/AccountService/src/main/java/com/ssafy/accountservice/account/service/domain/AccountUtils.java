package com.ssafy.accountservice.account.service.domain;

import io.github.cdimascio.dotenv.Dotenv;

public class AccountUtils {
    public static String getApiKey() {
        Dotenv dotenv = Dotenv.load();
        return dotenv.get("API_KEY");
    }
}
