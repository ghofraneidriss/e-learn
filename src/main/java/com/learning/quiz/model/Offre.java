package com.learning.quiz.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "offres")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Offre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Double prix;

    private Integer dureeEnMois;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TypeOffre type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NiveauAcces niveau;

    private Integer nombreCoursInclus;
    private Integer nombreQuizInclus;

    @ElementCollection
    @CollectionTable(name = "offre_matieres", joinColumns = @JoinColumn(name = "offre_id"))
    @Column(name = "matiere")
    private List<String> matieres;

    @ElementCollection
    @CollectionTable(name = "offre_avantages", joinColumns = @JoinColumn(name = "offre_id"))
    @Column(name = "avantage")
    private List<String> avantages;

    @Column(nullable = false)
    private Boolean actif = true;

    @Column(updatable = false)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "createur_id")
    private User createur;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum TypeOffre {
        BASIC, PREMIUM, VIP
    }

    public enum NiveauAcces {
        DEBUTANT, INTERMEDIAIRE, AVANCE
    }
}
