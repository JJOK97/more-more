package com.ssafy.notificationservice.service;

import com.ssafy.notificationservice.mapper.NotificationMapper;
import com.ssafy.notificationservice.service.domain.Notification;
import com.ssafy.notificationservice.global.client.MemberServiceClient;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationMapper notificationMapper;
    private final MemberServiceClient memberServiceClient;
    private final FirebaseMessaging firebaseMessaging;

    private static final Logger logger = LoggerFactory.getLogger(NotificationService.class);

    public NotificationService(NotificationMapper notificationMapper,
                               MemberServiceClient memberServiceClient,
                               FirebaseMessaging firebaseMessaging) {
        this.notificationMapper = notificationMapper;
        this.memberServiceClient = memberServiceClient;
        this.firebaseMessaging = firebaseMessaging;
    }

    // 알림 전송 및 저장 로직
    public void sendNotification(Notification notification) {
        // 상태와 생성 시간 설정
        Notification newNotification = Notification.builder()
                .receiverId(notification.getReceiverId())
                .notificationType(notification.getNotificationType())
                .referenceId(notification.getReferenceId())
                .actorId(notification.getActorId())
                .status("UNREAD")
                .createdAt(new Timestamp(System.currentTimeMillis()))
                .build();

        // 알림 저장
        notificationMapper.insertNotification(newNotification);

        // FCM을 통해 실제 알림 전송
        sendFirebaseNotification(newNotification.getReceiverId(), newNotification.getNotificationType());
    }

    // FCM을 이용한 알림 전송
    private void sendFirebaseNotification(Long memberId, String content) {
        String token = memberServiceClient.getFcmTokenByUserId(memberId);
        if (token == null) {
            logger.warn("FCM 토큰을 찾을 수 없습니다: {}", memberId);
            return;
        }

        Message message = Message.builder()
                .setToken(token)
                .setNotification(com.google.firebase.messaging.Notification.builder()
                        .setTitle("새 알림")
                        .setBody(content)
                        .build())
                .build();

        try {
            String response = firebaseMessaging.send(message);
            logger.info("알림 전송 성공: {}", response);
        } catch (FirebaseMessagingException e) {
            logger.error("알림 전송 실패", e);
        }
    }

    // 모든 알림을 읽음 상태로 변경
    public void markAllAsRead(Long memberId) {
        notificationMapper.markAllAsRead(memberId);
    }

    // FCM 토큰 저장
    public void saveFcmToken(Long memberId, String fcmToken) {
        memberServiceClient.updateFcmToken(memberId, fcmToken);
        logger.info("FCM 토큰 저장 완료: {} -> {}", memberId, fcmToken);
    }

    // 특정 사용자의 알림 목록 조회
    public List<Notification> getNotificationsByUser(Long memberId) {
        return notificationMapper.getNotificationsByUser(memberId);
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
