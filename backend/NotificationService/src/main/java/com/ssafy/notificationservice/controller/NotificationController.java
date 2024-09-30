package com.ssafy.notificationservice.controller;

import com.ssafy.notificationservice.service.NotificationService;
import com.ssafy.notificationservice.service.domain.Notification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    // 알림 생성
    @PostMapping
    public ResponseEntity<Void> createNotification(
            @RequestParam Long receiverId,
            @RequestParam String notificationType,
            @RequestParam Long referenceId,
            @RequestParam Long actorId,
            @RequestParam String fcmToken) {  // FCM 토큰 추가
        notificationService.createNotification(receiverId, notificationType, referenceId, actorId, fcmToken);  // FCM 토큰 포함
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
}
