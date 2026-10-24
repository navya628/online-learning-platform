
package com.onlinelearning.backend.service;

import com.onlinelearning.backend.model.QuizResult;
import com.onlinelearning.backend.repository.QuizResultRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizResultService {

    private final QuizResultRepository quizResultRepository;

    public QuizResultService(QuizResultRepository quizResultRepository) {
        this.quizResultRepository = quizResultRepository;
    }

    public List<QuizResult> getAllResults() {
        return quizResultRepository.findAll();
    }

    public Optional<QuizResult> getResultById(Long id) {
        return quizResultRepository.findById(id);
    }

    public List<QuizResult> getResultsByUser(Long userId) {
        return quizResultRepository.findByUserId(userId);
    }

    public List<QuizResult> getResultsByCourse(Long courseId) {
        return quizResultRepository.findByCourseId(courseId);
    }

    public QuizResult saveResult(QuizResult result) {
        return quizResultRepository.save(result);
    }

    public boolean deleteResult(Long id) {

        if (quizResultRepository.existsById(id)) {
            quizResultRepository.deleteById(id);
            return true;
        }

        return false;
    }
}