package com.learning.notification.controller;

import com.learning.notification.dto.NotificationDTO;
import com.learning.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    /** Called by quiz-service via OpenFeign when a quiz is created */
    @PostMapping
    public ResponseEntity<NotificationDTO.Response> create(@RequestBody NotificationDTO.Request request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(notificationService.create(request));
    }

    @GetMapping
    public ResponseEntity<List<NotificationDTO.Response>> getAll() {
        return ResponseEntity.ok(notificationService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<NotificationDTO.Response> getById(@PathVariable Long id) {
        return ResponseEntity.ok(notificationService.getById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<NotificationDTO.Response>> getByUser(@PathVariable String userId) {
        return ResponseEntity.ok(notificationService.getByUser(userId));
    }

    @GetMapping("/user/{userId}/non-lues")
    public ResponseEntity<List<NotificationDTO.Response>> getNonLues(@PathVariable String userId) {
        return ResponseEntity.ok(notificationService.getNonLues(userId));
    }

    @PatchMapping("/{id}/marquer-lu")
    public ResponseEntity<NotificationDTO.Response> marquerLu(@PathVariable Long id) {
        return ResponseEntity.ok(notificationService.marquerLu(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        notificationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
