package com.learning.quiz.repository;

import com.learning.quiz.model.Offre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OffreRepository extends JpaRepository<Offre, Long> {
    List<Offre> findByActifTrue();
    List<Offre> findByCreateurId(Long createurId);

    @Query("SELECT o FROM Offre o LEFT JOIN FETCH o.createur WHERE o.id = :id")
    Optional<Offre> findByIdWithCreateur(@Param("id") Long id);
}
