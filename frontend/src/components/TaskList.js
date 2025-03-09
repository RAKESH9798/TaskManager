import React, { useState } from "react";
import axios from "axios";
import "./TaskList.css";
import UpdateForm from "./UpdateForm";

const TaskList = ({ tasks, fetchTasks }) => {
  const [updateTask, setUpdateTask] = useState(null);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://taskmanager-backend-rrz9.onrender.com/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
        },
      });
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdate = (task) => {
    setUpdateTask(task);
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id} className="task-item">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
          <button className="update" onClick={() => handleUpdate(task)}>Update</button>
        </div>
      ))}
      {updateTask && (
        <UpdateForm
          task={updateTask}
          fetchTasks={fetchTasks}
          onClose={() => setUpdateTask(null)}
        />
      )}
    </div>
  );
};

export default TaskList;