package com.learning.notification.service;

import com.learning.notification.dto.NotificationDTO;
import com.learning.notification.model.Notification;
import com.learning.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationDTO.Response create(NotificationDTO.Request request) {
        Notification notification = Notification.builder()
                .message(request.getMessage())
                .type(request.getType())
                .userId(request.getUserId())
                .offreId(request.getOffreId())
                .build();
        return toResponse(notificationRepository.save(notification));
    }

    public List<NotificationDTO.Response> getAll() {
        return notificationRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public NotificationDTO.Response getById(Long id) {
        return notificationRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new IllegalArgumentException("Notification not found: " + id));
    }

    public List<NotificationDTO.Response> getByUser(String userId) {
        return notificationRepository.findByUserId(userId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<NotificationDTO.Response> getNonLues(String userId) {
        return notificationRepository.findByUserIdAndLuFalse(userId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public NotificationDTO.Response marquerLu(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Notification not found: " + id));
        notification.setLu(true);
        return toResponse(notificationRepository.save(notification));
    }

    public void delete(Long id) {
        notificationRepository.deleteById(id);
    }

    private NotificationDTO.Response toResponse(Notification n) {
        return NotificationDTO.Response.builder()
                .id(n.getId())
                .message(n.getMessage())
                .type(n.getType())
                .userId(n.getUserId())
                .offreId(n.getOffreId())
                .lu(n.getLu())
                .createdAt(n.getCreatedAt())
                .build();
    }
}
