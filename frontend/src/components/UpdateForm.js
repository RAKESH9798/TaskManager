import React, { useState } from "react";
import axios from "axios";
import "./UpdateForm.css";

const UpdateForm = ({ task, fetchTasks, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(task.dueDate.split("T")[0]); // Format date for input

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://taskmanager-backend-rrz9.onrender.com/api/tasks/${task._id}`,
        { title, description, status, dueDate },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
          },
        }
      );
      fetchTasks(); // Refresh the task list
      onClose(); // Close the update form
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="update-form-overlay">
      <div className="update-form">
        <h2>Update Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <button type="submit">Update Task</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;