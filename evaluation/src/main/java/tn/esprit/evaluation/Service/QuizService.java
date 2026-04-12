package tn.esprit.evaluation.Service;

import tn.esprit.evaluation.Entity.Quiz;
import java.util.List;

public interface QuizService {
    Quiz addQuiz(Quiz quiz);
    List<Quiz> getAllQuizzes();
    Quiz getQuizById(Long id);
    Quiz updateQuiz(Quiz quiz);
    void deleteQuiz(Long id);
    Quiz assignQuizToCourse(Long quizId, Long courseId);
}
