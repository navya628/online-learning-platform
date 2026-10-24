
package com.onlinelearning.backend.service;

import com.onlinelearning.backend.model.Quiz;
import com.onlinelearning.backend.repository.QuizRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

    private final QuizRepository quizRepository;

    public QuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public Optional<Quiz> getQuizById(Long id) {
        return quizRepository.findById(id);
    }

    public List<Quiz> getQuizzesByCourse(Long courseId) {
        return quizRepository.findByCourseId(courseId);
    }

    public Quiz createQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    public Optional<Quiz> updateQuiz(Long id, Quiz updatedQuiz) {

        return quizRepository.findById(id).map(quiz -> {

            quiz.setCourseId(updatedQuiz.getCourseId());
            quiz.setQuestion(updatedQuiz.getQuestion());
            quiz.setOptionA(updatedQuiz.getOptionA());
            quiz.setOptionB(updatedQuiz.getOptionB());
            quiz.setOptionC(updatedQuiz.getOptionC());
            quiz.setOptionD(updatedQuiz.getOptionD());
            quiz.setCorrectAnswer(updatedQuiz.getCorrectAnswer());

            return quizRepository.save(quiz);
        });
    }

    public boolean deleteQuiz(Long id) {

        if (quizRepository.existsById(id)) {
            quizRepository.deleteById(id);
            return true;
        }

        return false;
    }
}