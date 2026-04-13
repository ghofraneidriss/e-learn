package com.learning.notification.dto;

import lombok.*;
import java.time.LocalDateTime;

public class NotificationDTO {

    @Data
    public static class Request {
        private String message;
        private String type;
        private String userId;
        private Long offreId;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class Response {
        private Long id;
        private String message;
        private String type;
        private String userId;
        private Long offreId;
        private Boolean lu;
        private LocalDateTime createdAt;
    }
}
