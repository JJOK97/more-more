package com.ssafy.notificationservice.controller;

import com.ssafy.notificationservice.service.NotificationService;
import com.ssafy.notificationservice.service.domain.Notification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    // 알림 전송 엔드포인트
    @PostMapping("/send")
    public ResponseEntity<?> sendNotification(@RequestBody Notification notification) {
        notificationService.sendNotification(notification);
        return ResponseEntity.ok().build();
    }

    // 알림을 읽음 상태로 표시하는 엔드포인트
    @PostMapping("/mark-as-read")
    public ResponseEntity<?> markAsRead(@RequestParam Long memberId) {
        notificationService.markAllAsRead(memberId);
        return ResponseEntity.ok().build();
    }

    // FCM 토큰 저장
    @PostMapping("/tokens")
    public ResponseEntity<Void> saveFcmToken(@RequestBody Map<String, Object> requestData) {
        Long memberId = Long.valueOf(requestData.get("memberId").toString());
        String fcmToken = requestData.get("fcmToken").toString();

        System.out.println("Received memberId: " + memberId);
        System.out.println("Received fcmToken: " + fcmToken);

        // 유효한 데이터일 경우 서비스 로직 호출
        notificationService.saveFcmToken(memberId, fcmToken);
        return ResponseEntity.ok().build();
    }

    // 특정 유저의 알림 조회
    @GetMapping("/{userId}")
    public ResponseEntity<List<Notification>> getNotificationsByUser(@PathVariable Long userId) {
        List<Notification> notifications = notificationService.getNotificationsByUser(userId);
        return ResponseEntity.ok(notifications);
    }

    // 알림 읽음 처리
    @PatchMapping("/{notificationId}")
    public ResponseEntity<Void> markNotificationAsRead(@PathVariable Long notificationId) {
        notificationService.markNotificationAsRead(notificationId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/validate-token")
    public ResponseEntity<Map<String, Boolean>> validateToken(@RequestBody Map<String, Object> requestData) {
        Long memberId = Long.valueOf(requestData.get("memberId").toString());
        String fcmToken = requestData.get("fcmToken").toString();
        boolean isValid = notificationService.validateFcmToken(memberId, fcmToken);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isValid", isValid);
        return ResponseEntity.ok(response);
    }
}
