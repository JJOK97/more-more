package com.ssafy.notificationservice.service;

import com.ssafy.notificationservice.mapper.NotificationMapper;
import com.ssafy.notificationservice.service.domain.Notification;
import com.ssafy.notificationservice.global.client.MemberServiceClient;

import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationMapper notificationMapper;
    private final FirebaseNotificationService firebaseNotificationService;
    private final MemberServiceClient memberServiceClient;

    public NotificationService(NotificationMapper notificationMapper,
                               FirebaseNotificationService firebaseNotificationService,
                               MemberServiceClient memberServiceClient) {
        this.notificationMapper = notificationMapper;
        this.firebaseNotificationService = firebaseNotificationService;
        this.memberServiceClient = memberServiceClient;
    }

    // FCM 토큰 저장
    public void saveFcmToken(Long userId, String fcmToken) {
        memberServiceClient.updateFcmToken(userId, fcmToken);
        System.out.println("FCM 토큰 저장 완료: " + userId + " -> " + fcmToken);
    }

    // 알림 생성
    public void createNotification(Long receiverId, String notificationType, Long referenceId, Long actorId) {
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
        String fcmToken = memberServiceClient.getFcmTokenByUserId(receiverId);
        if (fcmToken != null) {
            String title = "새로운 알림";
            String body = "알림 내용";  // 알림 내용을 실제 데이터에 맞게 수정
            firebaseNotificationService.sendNotification(fcmToken, title, body);
        }
    }

    // 특정 사용자의 알림 목록 조회
    public List<Notification> getNotificationsByUser(Long userId) {
        return notificationMapper.getNotificationsByUser(userId);
    }

    // 알림을 읽음 상태로 변경
    public void markNotificationAsRead(Long notificationId) {
        notificationMapper.markNotificationAsRead(notificationId);
    }

    // FCM 토큰 유효성 검사
    public boolean validateFcmToken(Long userId, String fcmToken) {
        String storedToken = memberServiceClient.getFcmTokenByUserId(userId);
        return fcmToken.equals(storedToken);
    }
}