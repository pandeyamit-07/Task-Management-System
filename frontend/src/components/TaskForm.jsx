// src/components/TaskForm.jsx
import { useState } from "react";
import axios from "../api/axiosInstance";

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/tasks",
        { title, description, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setDescription("");
      setStatus("pending");
      onTaskAdded();
    } catch (error) {
      console.error(error);
      alert("Error adding task");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="task-textarea"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>

      <select
        className="task-select"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <button type="submit" className="task-btn">
        ➕ Add Task
      </button>
    </form>
  );
}

export default TaskForm;
