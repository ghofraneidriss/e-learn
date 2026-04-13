package com.learning.quiz.dto;

import com.learning.quiz.model.Offre;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

public class OffreDTO {

    @Data
    public static class Request {
        @NotBlank
        private String nom;
        private String description;
        @NotNull @Positive
        private Double prix;
        @NotNull @Positive
        private Integer dureeEnMois;
        @NotNull
        private Offre.TypeOffre type;
        @NotNull
        private Offre.NiveauAcces niveau;
        private Integer nombreCoursInclus;
        private Integer nombreQuizInclus;
        private List<String> matieres;
        private List<String> avantages;
    }

    @Data
    public static class Response {
        private Long id;
        private String nom;
        private String description;
        private Double prix;
        private Integer dureeEnMois;
        private Offre.TypeOffre type;
        private Offre.NiveauAcces niveau;
        private Integer nombreCoursInclus;
        private Integer nombreQuizInclus;
        private List<String> matieres;
        private List<String> avantages;
        private Boolean actif;
        private LocalDateTime createdAt;
        private String createurEmail;
    }
}
