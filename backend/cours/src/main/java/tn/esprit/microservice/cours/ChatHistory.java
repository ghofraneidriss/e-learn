package tn.esprit.microservice.cours;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class ChatHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long courseId;

    private String question;

    @Column(columnDefinition = "TEXT")
    private String answer;

    private LocalDateTime createdAt = LocalDateTime.now();
}
