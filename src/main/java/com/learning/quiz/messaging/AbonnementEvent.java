package com.learning.quiz.messaging;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AbonnementEvent {
    private Long abonnementId;
    private Long offreId;
    private String offreNom;
    private String userEmail;
    private Double montantPaye;
    private String referenceTransaction;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private LocalDateTime createdAt;
}
