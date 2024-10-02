package com.ssafy.notificationservice.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class FirebaseNotificationService {

    private static final Logger logger = LoggerFactory.getLogger(FirebaseNotificationService.class);

    public void sendNotification(String token, String title, String body) {
        try {
            logger.info("Sending notification to token: {}", token); // 토큰 로그 추가

            Message message = Message.builder()
                    .setToken(token)
                    .putData("title", title)
                    .putData("body", body)
                    .build();

            String response = FirebaseMessaging.getInstance().send(message);
            logger.info("Successfully sent message: {}", response);
        } catch (FirebaseMessagingException e) {
            logger.error("Error sending Firebase message", e);
        } catch (IllegalStateException e) {
            logger.error("Firebase app not initialized", e);
        }
    }
}