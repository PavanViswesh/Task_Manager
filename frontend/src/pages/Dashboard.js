import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Dashboard({ onLogout }) {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [refresh, setRefresh] = useState(false); // 👈 1. ADD THIS

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        {/* HEADER */}
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <div className="logout" onClick={onLogout}>
            👤 Logout
          </div>
        </div>

        {/* ADD TASK BUTTON */}
        <button
          className="add-task-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Task
        </button>

        {/* FILTERS */}
        <div className="filter-section">
          <span className="filter-label">Filter by status:</span>
          <div className="filter-pills">
            <button
              className={`pill ${filter === "ALL" ? "active" : ""}`}
              onClick={() => setFilter("ALL")}
            >
              All
            </button>
            <button
              className={`pill ${filter === "IN_PROGRESS" ? "active" : ""}`}
              onClick={() => setFilter("IN_PROGRESS")}
            >
              In Progress
            </button>
            <button
              className={`pill ${filter === "COMPLETED" ? "active" : ""}`}
              onClick={() => setFilter("COMPLETED")}
            >
              Completed
            </button>
          </div>
        </div>

        {/* TASK LIST */}
        <div className="task-list-wrapper">
          {/* 👇 3. PASS refresh HERE */}
          <TaskList filter={filter} refresh={refresh} />
        </div>

        {/* ADD TASK MODAL */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-card">
              {/* 👇 2. PASS onTaskAdded HERE */}
              <TaskForm
                onClose={() => setShowModal(false)}
                onTaskAdded={() => setRefresh((prev) => !prev)}
              />

              <TaskList filter={filter} refresh={refresh} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;
