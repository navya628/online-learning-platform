
package com.onlinelearning.backend.service;

import com.onlinelearning.backend.model.Progress;
import com.onlinelearning.backend.repository.ProgressRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProgressService {

    private final ProgressRepository progressRepository;

    public ProgressService(ProgressRepository progressRepository) {
        this.progressRepository = progressRepository;
    }

    public List<Progress> getAllProgress() {
        return progressRepository.findAll();
    }

    public Optional<Progress> getProgressById(Long id) {
        return progressRepository.findById(id);
    }

    public List<Progress> getProgressByUser(Long userId) {
        return progressRepository.findByUserId(userId);
    }

    public List<Progress> getProgressByCourse(Long courseId) {
        return progressRepository.findByCourseId(courseId);
    }

    public Progress createProgress(Progress progress) {
        return progressRepository.save(progress);
    }

    public Optional<Progress> updateProgress(Long id, Progress updatedProgress) {

        return progressRepository.findById(id).map(progress -> {

            progress.setUserId(updatedProgress.getUserId());
            progress.setCourseId(updatedProgress.getCourseId());
            progress.setPercentage(updatedProgress.getPercentage());
            progress.setStatus(updatedProgress.getStatus());
            progress.setLastLesson(updatedProgress.getLastLesson());

            return progressRepository.save(progress);
        });
    }

    public boolean deleteProgress(Long id) {

        if (progressRepository.existsById(id)) {
            progressRepository.deleteById(id);
            return true;
        }

        return false;
    }
}
