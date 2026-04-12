package tn.esprit.microservice.cours;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoursRepository extends JpaRepository<Cours, Long> {
    @Query("SELECT c FROM Cours c WHERE " +
            "(:title IS NULL OR c.title LIKE %:title%) AND " +
            "(:category IS NULL OR c.category = :category) AND " +
            "(:level IS NULL OR c.level = :level)")
    List<Cours> findByFilters(String title, String category, Level level);
    List<Cours> findTop5ByOrderByCreated_atDesc();

}
