
package com.onlinelearning.backend.repository;

import com.onlinelearning.backend.model.Progress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgressRepository extends JpaRepository<Progress, Long> {

    List<Progress> findByUserId(Long userId);

    List<Progress> findByCourseId(Long courseId);
}