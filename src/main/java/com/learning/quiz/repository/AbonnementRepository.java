package com.learning.quiz.repository;

import com.learning.quiz.model.Abonnement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AbonnementRepository extends JpaRepository<Abonnement, Long> {
    List<Abonnement> findByUserId(Long userId);
    List<Abonnement> findByOffreId(Long offreId);
    boolean existsByUserIdAndOffreIdAndStatut(Long userId, Long offreId, Abonnement.StatutAbonnement statut);
}
