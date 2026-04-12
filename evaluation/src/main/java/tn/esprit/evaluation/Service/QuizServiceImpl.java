package tn.esprit.evaluation.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.evaluation.Entity.Quiz;
import tn.esprit.evaluation.Repository.QuizRepository;
import tn.esprit.evaluation.Client.CoursClient;
import feign.FeignException;

import java.util.List;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuizMessageProducer quizMessageProducer;

    @Autowired
    private CoursClient coursClient;

    @Override
    public Quiz addQuiz(Quiz quiz) {
        Quiz savedQuiz = quizRepository.save(quiz);
        quizMessageProducer.sendQuizNotification("New quiz created with id: " + savedQuiz.getId());
        return savedQuiz;
    }

    @Override
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    @Override
    public Quiz getQuizById(Long id) {
        return quizRepository.findById(id).orElse(null);
    }

    @Override
    public Quiz updateQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    @Override
    public void deleteQuiz(Long id) {
        quizRepository.deleteById(id);
    }

    @Override
    public Quiz assignQuizToCourse(Long quizId, Long courseId) {
        Quiz quiz = quizRepository.findById(quizId).orElse(null);
        if (quiz != null) {
            try {
                Object course = coursClient.getCourseById(courseId);
                if (course != null) {
                    quiz.setCourseId(courseId);
                    return quizRepository.save(quiz);
                }
            } catch (FeignException e) {
                // Course doesn't exist
                return null;
            }
        }
        return null;
    }
}
