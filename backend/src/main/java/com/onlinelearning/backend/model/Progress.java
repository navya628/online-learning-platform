
package com.onlinelearning.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "progress")
public class Progress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long courseId;

    private int percentage;

    private String status;

    private String lastLesson;

    public Progress() {
    }

    public Progress(Long userId, Long courseId, int percentage,
                    String status, String lastLesson) {
        this.userId = userId;
        this.courseId = courseId;
        this.percentage = percentage;
        this.status = status;
        this.lastLesson = lastLesson;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public int getPercentage() {
        return percentage;
    }

    public void setPercentage(int percentage) {
        this.percentage = percentage;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLastLesson() {
        return lastLesson;
    }

    public void setLastLesson(String lastLesson) {
        this.lastLesson = lastLesson;
    }
}