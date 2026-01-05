import { useEffect, useState } from "react";
import api from "../api/axios";

function TaskList({ filter, refresh }) {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [loading, setLoading] = useState(true);

  // Load tasks
  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  // Reload when refresh changes (only after login)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // 🔒 prevent 403 before login

    loadTasks();
  }, [refresh]);

  // Toggle task status
  const toggleStatus = async (task) => {
    const newStatus =
      task.status === "COMPLETED" ? "IN_PROGRESS" : "COMPLETED";

    try {
      await api.put(`/api/tasks/${task.id}`, {
        title: task.title,
        description: task.description,
        status: newStatus,
        dueDate: task.dueDate,
      });
      loadTasks();
    } catch (err) {
      console.error("Failed to update status");
    }
  };

  // Start editing
  const startEdit = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
  };

  // Save edit
  const saveEdit = async (task) => {
    try {
      await api.put(`/api/tasks/${task.id}`, {
        title: editTitle,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
      });
      setEditingTaskId(null);
      loadTasks();
    } catch (err) {
      console.error("Failed to update task");
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await api.delete(`/api/tasks/${id}`);
      loadTasks();
    } catch (err) {
      console.error("Failed to delete task");
    }
  };

  // Apply filter
  const filteredTasks =
    filter === "ALL"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  return (
    <div className="task-list-wrapper">
      <h3 style={{ marginBottom: "15px" }}>My Tasks</h3>

      {/* 🔹 Loading Skeleton */}
      {loading && (
        <>
          <div className="task-card skeleton">
            <div className="skeleton skeleton-text"></div>
          </div>
          <div className="task-card skeleton">
            <div className="skeleton skeleton-text"></div>
          </div>
          <div className="task-card skeleton">
            <div className="skeleton skeleton-text"></div>
          </div>
        </>
      )}

      {/* 🔹 Empty State */}
      {!loading && filteredTasks.length === 0 && (
        <p style={{ color: "#6b7280", textAlign: "center", marginTop: "20px" }}>
          No tasks yet. Add your first task 🚀
        </p>
      )}

      {/* 🔹 Task List */}
      {!loading &&
        filteredTasks.map((task) => {
          const isOverdue =
            task.dueDate &&
            new Date(task.dueDate) < new Date() &&
            task.status !== "COMPLETED";

          return (
            <div className="task-card" key={task.id}>
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={task.status === "COMPLETED"}
                onChange={() => toggleStatus(task)}
                className="task-checkbox"
              />

              {/* Title + Due Date */}
              <div style={{ flex: 1 }}>
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "6px 10px",
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      fontSize: "0.9rem",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      textDecoration:
                        task.status === "COMPLETED"
                          ? "line-through"
                          : "none",
                      opacity: task.status === "COMPLETED" ? 0.6 : 1,
                    }}
                  >
                    {task.title}
                  </div>
                )}

                {task.dueDate && (
                  <small
                    style={{
                      color: isOverdue ? "#dc2626" : "#6b7280",
                      fontWeight: isOverdue ? "600" : "400",
                    }}
                  >
                    Due: {task.dueDate}
                  </small>
                )}
              </div>

              {/* Status */}
              <span className={`status ${task.status}`}>
                {task.status.replace("_", " ")}
              </span>

              {/* Edit / Save */}
              {editingTaskId === task.id ? (
                <button onClick={() => saveEdit(task)}>💾</button>
              ) : (
                <button onClick={() => startEdit(task)}>✏️</button>
              )}

              {/* Delete */}
              <button onClick={() => deleteTask(task.id)}>🗑️</button>
            </div>
          );
        })}
    </div>
  );
}

export default TaskList;
