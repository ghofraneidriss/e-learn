package tn.esprit.microservice.evenement.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.microservice.evenement.Entity.Evenement;
import tn.esprit.microservice.evenement.Entity.TypeEvenement;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EvenementRepository extends JpaRepository<Evenement, Long> {

    // 1. Trouver les événements à venir ayant encore des places disponibles
    @Query("SELECT e FROM Evenement e WHERE e.date > CURRENT_TIMESTAMP AND SIZE(e.participantsIds) < e.capaciteMax")
    List<Evenement> findUpcomingEventsWithAvailableSeats();

    // 2. Trouver les événements les plus populaires (à venir)
    @Query("SELECT e FROM Evenement e WHERE e.date > CURRENT_TIMESTAMP ORDER BY SIZE(e.participantsIds) DESC")
    List<Evenement> findMostPopularUpcomingEvents();

    // 3. Statistiques : Total des inscriptions pour un Formateur
    @Query("SELECT SUM(SIZE(e.participantsIds)) FROM Evenement e WHERE e.formateurId = :formateurId")
    Long countTotalParticipantsByFormateurId(@Param("formateurId") Long formateurId);

    // 4. Trouver les événements où un utilisateur spécifique est inscrit
    @Query("SELECT e FROM Evenement e JOIN e.participantsIds p WHERE p = :utilisateurId")
    List<Evenement> findEvenementsByParticipantId(@Param("utilisateurId") Long utilisateurId);

    // 5. Détection de conflits de dates (Chevauchement)
    @Query("SELECT e FROM Evenement e WHERE e.formateurId = :formateurId " +
           "AND ((e.date BETWEEN :startDate AND :endDate) " +
           "OR (e.dateFin BETWEEN :startDate AND :endDate))")
    List<Evenement> findOverlappingEventsForFormateur(@Param("formateurId") Long formateurId, 
                                                      @Param("startDate") LocalDateTime startDate, 
                                                      @Param("endDate") LocalDateTime endDate);

    // 6. Recommandation ciblée : Événements futurs par type et mots-clés
    @Query("SELECT e FROM Evenement e WHERE e.type = :type " +
           "AND e.date > CURRENT_TIMESTAMP " +
           "AND (LOWER(e.nom) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(e.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Evenement> findUpcomingEventsByTypeAndKeyword(@Param("type") TypeEvenement type, 
                                                       @Param("keyword") String keyword);
}
