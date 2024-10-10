package com.ssafy.notificationservice.global.config;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFeignClients(basePackages = "com.ssafy.notificationservice.global.client")
public class FeignConfig {
    // 필요한 경우 추가 설정을 여기에 작성합니다.
}