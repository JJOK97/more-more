package com.ssafy.notificationservice.service;

import com.ssafy.notificationservice.mapper.NotificationMapper;
import com.ssafy.notificationservice.service.domain.Notification;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationMapper notificationMapper;
    private final FirebaseNotificationService firebaseNotificationService;

    public NotificationService(NotificationMapper notificationMapper, FirebaseNotificationService firebaseNotificationService) {
        this.notificationMapper = notificationMapper;
        this.firebaseNotificationService = firebaseNotificationService;
    }

    // FCM 토큰 저장
    public void saveFcmToken(Long userId, String fcmToken) {
        notificationMapper.updateFcmToken(userId, fcmToken);
        // DB에 업데이트 결과를 로깅 또는 예외 처리를 통해 확인
        System.out.println("FCM 토큰 저장 완료: " + userId + " -> " + fcmToken);
    }

    // 알림 생성
    public void createNotification(Long receiverId, String notificationType, Long referenceId, Long actorId) {
        // 알림 생성 로직
        Notification notification = Notification.builder()
                .receiverId(receiverId)
                .notificationType(notificationType)
                .referenceId(referenceId)
                .actorId(actorId)
                .status("UNREAD")
                .createdAt(new Timestamp(System.currentTimeMillis()))
                .build();

        notificationMapper.insertNotification(notification);

        // Firebase 푸시 알림 전송
        String fcmToken = notificationMapper.getFcmTokenByUserId(receiverId);  // DB에서 FCM 토큰 조회
        if (fcmToken != null) {
            String title = "새로운 알림";
            String body = "알림 내용";  // 알림 내용을 실제 데이터에 맞게 수정
            firebaseNotificationService.sendNotification(fcmToken, title, body);
        }
    }

    public List<Notification> getNotificationsByUser(Long userId) {
        return notificationMapper.getNotificationsByUser(userId);
    }

    public void markNotificationAsRead(Long notificationId) {
        notificationMapper.markNotificationAsRead(notificationId);
    }
}
