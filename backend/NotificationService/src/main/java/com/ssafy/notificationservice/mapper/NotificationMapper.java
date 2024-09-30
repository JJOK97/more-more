package com.ssafy.notificationservice.mapper;

import com.ssafy.notificationservice.service.domain.Notification;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface NotificationMapper {
    void insertNotification(Notification notification);
    List<Notification> getNotificationsByUser(Long userId);
    void markNotificationAsRead(Long notificationId);
}
