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

    // FCM 토큰 저장
    @PostMapping("/tokens")
    public ResponseEntity<Void> saveFcmToken(@RequestBody Map<String, Object> requestData) {
        Long userId = Long.valueOf(requestData.get("userId").toString());
        String fcmToken = requestData.get("fcmToken").toString();

        System.out.println("Received userId: " + userId);
        System.out.println("Received fcmToken: " + fcmToken);

        // 유효한 데이터일 경우 서비스 로직 호출
        notificationService.saveFcmToken(userId, fcmToken);
        return ResponseEntity.ok().build();
    }

    // 알림 생성
    @PostMapping
    public ResponseEntity<Void> createNotification(
            @RequestParam Long receiverId,
            @RequestParam String notificationType,
            @RequestParam Long referenceId,
            @RequestParam Long actorId
    ) {
        notificationService.createNotification(receiverId, notificationType, referenceId, actorId);
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
        Long userId = Long.valueOf(requestData.get("userId").toString());
        String fcmToken = requestData.get("fcmToken").toString();
        boolean isValid = notificationService.validateFcmToken(userId, fcmToken);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isValid", isValid);
        return ResponseEntity.ok(response);
    }
}
