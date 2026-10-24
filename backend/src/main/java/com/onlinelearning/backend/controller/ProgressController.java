
package com.onlinelearning.backend.controller;

import com.onlinelearning.backend.model.Progress;
import com.onlinelearning.backend.service.ProgressService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "*")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping
    public List<Progress> getAllProgress() {
        return progressService.getAllProgress();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Progress> getProgressById(
            @PathVariable Long id) {

        return progressService.getProgressById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<Progress> getProgressByUser(
            @PathVariable Long userId) {

        return progressService.getProgressByUser(userId);
    }

    @GetMapping("/course/{courseId}")
    public List<Progress> getProgressByCourse(
            @PathVariable Long courseId) {

        return progressService.getProgressByCourse(courseId);
    }

    @PostMapping
    public ResponseEntity<Progress> createProgress(
            @RequestBody Progress progress) {

        Progress savedProgress =
                progressService.createProgress(progress);

        return ResponseEntity.ok(savedProgress);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Progress> updateProgress(
            @PathVariable Long id,
            @RequestBody Progress progress) {

        return progressService.updateProgress(id, progress)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProgress(
            @PathVariable Long id) {

        if (progressService.deleteProgress(id)) {
            return ResponseEntity.ok("Progress deleted successfully");
        }

        return ResponseEntity.notFound().build();
    }
}