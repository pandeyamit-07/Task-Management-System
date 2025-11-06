import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import EditTaskForm from "../components/EditTaskForm";
import "../styles/Dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/");
      const res = await axios.get(
        `/tasks?page=${page}&limit=5&status=${statusFilter}&search=${search}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      navigate("/");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, statusFilter, search]);

  // Delete + Edit + Update same as before ...

  return (
    <div className="dashboard">
      <div className="dashboard-box">
        <div className="dashboard-header">
          <h1>My Tasks</h1>
        </div>

        <div className="filter-section">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <TaskForm onTaskAdded={fetchTasks} />
        {editTask && (
          <EditTaskForm
            task={editTask}
            onUpdate={handleUpdate}
            onCancel={() => setEditTask(null)}
          />
        )}

        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t._id}>
                <td>{t.title}</td>
                <td>{t.description}</td>
                <td>{t.status}</td>
                <td>
                  <button onClick={() => handleEdit(t)}>Edit</button>
                  <button onClick={() => handleDelete(t._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ⬅ Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
