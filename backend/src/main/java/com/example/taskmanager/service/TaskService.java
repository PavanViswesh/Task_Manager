package com.example.taskmanager.service;

import com.example.taskmanager.dto.TaskRequest;
import com.example.taskmanager.model.Status;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.User;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    // Get currently logged-in user from SecurityContext
    private User getLoggedInUser() {
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();   // ✅ CORRECT WAY

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Get all tasks of logged-in user
    public List<Task> getAllTasks() {
        User user = getLoggedInUser();
        return taskRepository.findByUser(user);
    }

    // Create a new task
    public Task createTask(TaskRequest request) {
        User user = getLoggedInUser();

        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setUser(user);
        task.setDueDate(request.getDueDate());


        return taskRepository.save(task);
    }

    // Update task
    public Task updateTask(Long taskId, TaskRequest request) {
        User user = getLoggedInUser();

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access");
        }

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setDueDate(request.getDueDate());


        return taskRepository.save(task);
    }

    // Delete task
    public void deleteTask(Long taskId) {
        User user = getLoggedInUser();

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access");
        }

        taskRepository.delete(task);
    }

    public List<Task> getTasksByStatus(Status status) {
        User user = getLoggedInUser();
        return taskRepository.findByUserAndStatus(user, status);
    }

}
