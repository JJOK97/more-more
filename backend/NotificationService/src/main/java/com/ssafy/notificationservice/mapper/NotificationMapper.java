package com.ssafy.notificationservice.mapper;

import com.ssafy.notificationservice.service.domain.Notification;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface NotificationMapper {

    // 알림 생성
    void insertNotification(Notification notification);

    // 특정 유저의 알림 조회
    List<Notification> getNotificationsByUser(Long memberId);

    // 알림 읽음 처리
    void markNotificationAsRead(Long notificationId);

    // 특정 유저의 모든 알림 읽음 처리
    void markAllAsRead(@Param("memberId") Long memberId);

}
