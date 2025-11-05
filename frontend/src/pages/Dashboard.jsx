import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import EditTaskForm from "../components/EditTaskForm";
import "../styles/Dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/");
      const res = await axios.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      navigate("/");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Error deleting task");
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
  };

  const handleUpdate = async (updatedTask) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`/tasks/${updatedTask._id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditTask(null);
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Error updating task");
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-box">
        <div className="dashboard-header">
          <h1 className="dashboard-title">🗂️ My Tasks</h1>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>

        {/* Add Task Form */}
        <div className="task-form-container">
          <h2 className="form-heading">Add New Task</h2>
          <TaskForm onTaskAdded={fetchTasks} />
        </div>

        {/* Edit Task Form */}
        {editTask && (
          <EditTaskForm
            task={editTask}
            onUpdate={handleUpdate}
            onCancel={() => setEditTask(null)}
          />
        )}

        {/* Tasks Table */}
        <div className="task-table-wrapper">
          <table className="task-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th className="actions-column">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t._id}>
                  <td>{t.title}</td>
                  <td>{t.description}</td>
                  <td>
                    <span
                      className={`status-tag ${
                        t.status === "completed" ? "completed" : "pending"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="actions-column">
                    <button
                      onClick={() => handleEdit(t)}
                      className="action-btn edit-btn"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="action-btn delete-btn"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {tasks.length === 0 && (
            <p className="no-tasks">No tasks found! Add your first task above.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
