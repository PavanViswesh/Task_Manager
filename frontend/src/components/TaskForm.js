import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

function TaskForm({ onClose, onTaskAdded}) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("IN_PROGRESS");
  const [dueDate, setDueDate] = useState("");


  const addTask = async () => {
    if (!title.trim()) {
      toast.warning("Task title required");
      return;
    }

    try {
      await api.post("/api/tasks", {
        title,
        description: "",
        status,
        dueDate,
      });

      toast.success("Task added ✅");
      onTaskAdded();
      setTitle("");
      onClose(); // close modal
    } catch (err) {
      toast.error("Failed to add task ❌");
    }
  };

  return (
    <div className="task-form">
      <h3 style={{ marginBottom: "15px", textAlign: "center" }}>
        Add New Task
      </h3>

      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "14px",
          border: "1px solid #e5e7eb",
          marginBottom: "12px",
          fontSize: "0.9rem",
          boxSizing: "border-box",
          outline: "none",
        }}
      />

      <select
        value={status} onChange={(e) => setStatus(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          marginBottom: "16px",
          boxSizing: "border-box",
        }}
      >
        <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
      </select>

      <button
        onClick={addTask}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "14px",
          border: "none",
          background: "#3b82f6",
          color: "white",
          fontWeight: "600",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        Add Task
      </button>

      <button
        onClick={onClose}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "14px",
          border: "none",
          background: "#f3f4f6",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Cancel
      </button>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          marginBottom: "12px",
          boxSizing: "border-box",
        }}
      />

    </div>
  );
}

export default TaskForm;
