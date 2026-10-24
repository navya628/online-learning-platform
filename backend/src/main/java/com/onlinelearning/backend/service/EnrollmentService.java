package com.onlinelearning.backend.service;

import com.onlinelearning.backend.model.Enrollment;
import com.onlinelearning.backend.repository.EnrollmentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }

    public Enrollment enrollUser(Long userId, Long courseId) {

        Enrollment enrollment = new Enrollment();

        enrollment.setUserId(userId);
        enrollment.setCourseId(courseId);
        enrollment.setEnrolledDate(LocalDate.now());

        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getEnrollmentsByUser(Long userId) {
        return enrollmentRepository.findByUserId(userId);
    }

    public List<Enrollment> getEnrollmentsByCourse(Long courseId) {
        return enrollmentRepository.findByCourseId(courseId);
    }

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    public boolean deleteEnrollment(Long id) {

        if (enrollmentRepository.existsById(id)) {
            enrollmentRepository.deleteById(id);
            return true;
        }

        return false;
    }
}