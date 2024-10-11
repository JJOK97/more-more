package com.ssafy.notificationservice.service.domain;

import java.sql.Timestamp;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {
    private Long id;
    private Long receiverId;
    private String notificationType;
    private Long referenceId;
    private Long actorId;
    private String status;
    private Timestamp createdAt;
}