package tn.esprit.evaluation.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.evaluation.Entity.Quiz;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
}
