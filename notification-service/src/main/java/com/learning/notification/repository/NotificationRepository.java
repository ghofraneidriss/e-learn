package com.learning.notification.repository;

import com.learning.notification.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByUserId(String userId);

    List<Notification> findByOffreId(Long offreId);

    List<Notification> findByUserIdAndLuFalse(String userId);
}
