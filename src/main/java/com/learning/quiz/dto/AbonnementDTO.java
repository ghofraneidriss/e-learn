package com.learning.quiz.dto;

import com.learning.quiz.model.Abonnement;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class AbonnementDTO {

    @Data
    public static class Request {
        @NotNull
        private Long offreId;
        @NotNull
        private Abonnement.MethodePaiement methodePaiement;
        @NotBlank
        private String nomTitulaire;
    }

    @Data
    public static class Response {
        private Long id;
        private String userEmail;
        private Long offreId;
        private String offreNom;
        private Double montantPaye;
        private Abonnement.StatutAbonnement statut;
        private Abonnement.MethodePaiement methodePaiement;
        private Abonnement.StatutPaiement statutPaiement;
        private String referenceTransaction;
        private String nomTitulaire;
        private LocalDate dateDebut;
        private LocalDate dateFin;
        private LocalDateTime createdAt;
    }
}
