import { useEffect, useState } from "react";
import api from "../api/axios";

function TaskList({ filter, refresh }) {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // Load tasks
  const loadTasks = async () => {
    try {
      const res = await api.get("/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to load tasks");
    }
  };

  // Reload when refresh changes
  useEffect(() => {
    loadTasks();
  }, [refresh]);

  // Toggle task status (checkbox)
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

  // Start editing title
  const startEdit = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
  };

  // Save edited task
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
    const confirmDelete = window.confirm("Delete this task?");
    if (!confirmDelete) return;

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
    <div className="task-list">
      <h3>My Tasks</h3>

      {filteredTasks.length === 0 && (
        <p style={{ color: "#6b7280", textAlign: "center", marginTop: "20px" }}>
          No tasks yet. Add your first task 🚀
        </p>
      )}

      {filteredTasks.map((task) => {
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

            {/* Status badge */}
            <span
              className={`status ${task.status}`}
              style={{ marginRight: "8px" }}
            >
              {task.status.replace("_", " ")}
            </span>

            {/* Edit / Save */}
            {editingTaskId === task.id ? (
              <button
                onClick={() => saveEdit(task)}
                title="Save"
                style={{
                  marginLeft: "6px",
                  border: "none",
                  background: "#dcfce7",
                  color: "#166534",
                  borderRadius: "8px",
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                💾
              </button>
            ) : (
              <button
                onClick={() => startEdit(task)}
                title="Edit"
                style={{
                  marginLeft: "6px",
                  border: "none",
                  background: "#e0e7ff",
                  color: "#3730a3",
                  borderRadius: "8px",
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                ✏️
              </button>
            )}

            {/* Delete */}
            <button
              onClick={() => deleteTask(task.id)}
              title="Delete"
              style={{
                marginLeft: "6px",
                border: "none",
                background: "#fee2e2",
                color: "#b91c1c",
                borderRadius: "8px",
                padding: "6px 10px",
                cursor: "pointer",
              }}
            >
              🗑️
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default TaskList;
