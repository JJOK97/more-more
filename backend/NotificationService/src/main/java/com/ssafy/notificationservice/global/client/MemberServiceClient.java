package com.ssafy.notificationservice.global.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "member-service", url = "https://j11a605.p.ssafy.io/api/member")
public interface MemberServiceClient {

    @GetMapping("/api/member/{userId}/fcm-token")
    String getFcmTokenByUserId(@PathVariable("userId") Long userId);

    @PutMapping("/api/member/{userId}/fcm-token")
    void updateFcmToken(@PathVariable("userId") Long userId, @RequestParam("fcmToken") String fcmToken);
}