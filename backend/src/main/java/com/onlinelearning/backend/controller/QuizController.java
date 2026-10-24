
package com.onlinelearning.backend.controller;

import com.onlinelearning.backend.model.Quiz;
import com.onlinelearning.backend.service.QuizService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin(origins = "*")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping
    public List<Quiz> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(
            @PathVariable Long id) {

        return quizService.getQuizById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/course/{courseId}")
    public List<Quiz> getQuizzesByCourse(
            @PathVariable Long courseId) {

        return quizService.getQuizzesByCourse(courseId);
    }

    @PostMapping
    public ResponseEntity<Quiz> createQuiz(
            @RequestBody Quiz quiz) {

        Quiz savedQuiz = quizService.createQuiz(quiz);

        return ResponseEntity.ok(savedQuiz);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Quiz> updateQuiz(
            @PathVariable Long id,
            @RequestBody Quiz quiz) {

        return quizService.updateQuiz(id, quiz)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteQuiz(
            @PathVariable Long id) {

        if (quizService.deleteQuiz(id)) {
            return ResponseEntity.ok("Quiz deleted successfully");
        }

        return ResponseEntity.notFound().build();
    }
}
