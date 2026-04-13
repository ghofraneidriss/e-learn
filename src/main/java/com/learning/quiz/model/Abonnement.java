package com.learning.quiz.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "abonnements")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Abonnement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "offre_id", nullable = false)
    private Offre offre;

    @Column(nullable = false)
    private LocalDate dateDebut;

    @Column(nullable = false)
    private LocalDate dateFin;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutAbonnement statut;

    // Payment info
    @Enumerated(EnumType.STRING)
    private MethodePaiement methodePaiement;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutPaiement statutPaiement;

    private Double montantPaye;
    private String referenceTransaction;
    private String nomTitulaire;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public enum StatutAbonnement {
        ACTIF, EXPIRE, ANNULE
    }

    public enum MethodePaiement {
        CARTE_BANCAIRE, PAYPAL, VIREMENT
    }

    public enum StatutPaiement {
        EN_ATTENTE, PAYE, ECHEC
    }
}
