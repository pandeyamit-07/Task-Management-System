// src/components/EditTaskForm.jsx
import { useState } from "react";


function EditTaskForm({ task, onUpdate, onCancel }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...task, title, description, status });
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <h2 className="edit-form-heading">✏️ Edit Task</h2>

      <input
        type="text"
        className="edit-input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="edit-textarea"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>

      <select
        className="edit-select"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <div className="edit-actions">
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
        <button type="submit" className="save-btn">
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default EditTaskForm;
