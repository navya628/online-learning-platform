
package com.onlinelearning.backend.controller;

import com.onlinelearning.backend.model.QuizResult;
import com.onlinelearning.backend.service.QuizResultService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz-results")
@CrossOrigin(origins = "*")
public class QuizResultController {

    private final QuizResultService quizResultService;

    public QuizResultController(QuizResultService quizResultService) {
        this.quizResultService = quizResultService;
    }

    @GetMapping
    public List<QuizResult> getAllResults() {
        return quizResultService.getAllResults();
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuizResult> getResultById(
            @PathVariable Long id) {

        return quizResultService.getResultById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<QuizResult> getResultsByUser(
            @PathVariable Long userId) {

        return quizResultService.getResultsByUser(userId);
    }

    @GetMapping("/course/{courseId}")
    public List<QuizResult> getResultsByCourse(
            @PathVariable Long courseId) {

        return quizResultService.getResultsByCourse(courseId);
    }

    @PostMapping
    public ResponseEntity<QuizResult> saveResult(
            @RequestBody QuizResult result) {

        QuizResult savedResult =
                quizResultService.saveResult(result);

        return ResponseEntity.ok(savedResult);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteResult(
            @PathVariable Long id) {

        if (quizResultService.deleteResult(id)) {
            return ResponseEntity.ok("Quiz result deleted successfully");
        }

        return ResponseEntity.notFound().build();
    }
}
