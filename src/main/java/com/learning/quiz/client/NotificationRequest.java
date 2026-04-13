package com.learning.quiz.client;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationRequest {
    private String message;
    private String type;
    private String userId;
    private Long offreId;
}
