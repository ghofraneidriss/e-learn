package com.learning.quiz.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * Scenario 1 — OpenFeign:
 * Synchronous HTTP call to notification-service.
 * Called by QuizService after a quiz is created by a teacher.
 */
@FeignClient(name = "notification-service")
public interface NotificationClient {

    @PostMapping("/api/notifications")
    void createNotification(@RequestBody NotificationRequest request);
}
