package com.onlinelearning.backend.controller;

import com.onlinelearning.backend.model.Enrollment;
import com.onlinelearning.backend.service.EnrollmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping
    public ResponseEntity<Enrollment> enrollUser(
            @RequestParam Long userId,
            @RequestParam Long courseId) {

        Enrollment enrollment =
                enrollmentService.enrollUser(userId, courseId);

        return ResponseEntity.ok(enrollment);
    }

    @GetMapping
    public List<Enrollment> getAllEnrollments() {
        return enrollmentService.getAllEnrollments();
    }

    @GetMapping("/user/{userId}")
    public List<Enrollment> getUserEnrollments(
            @PathVariable Long userId) {

        return enrollmentService.getEnrollmentsByUser(userId);
    }

    @GetMapping("/course/{courseId}")
    public List<Enrollment> getCourseEnrollments(
            @PathVariable Long courseId) {

        return enrollmentService.getEnrollmentsByCourse(courseId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEnrollment(
            @PathVariable Long id) {

        if (enrollmentService.deleteEnrollment(id)) {
            return ResponseEntity.ok(
                    "Enrollment deleted successfully"
            );
        }

        return ResponseEntity.notFound().build();
    }
}