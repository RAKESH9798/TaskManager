import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "./Dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // Fetch tasks from the backend
  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:4444/api/tasks", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [userInfo.token]);

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = tasks.filter((task) => {
    const query = searchQuery.toLowerCase();
  
    // Safeguard against undefined values
    const title = task.title ? task.title.toLowerCase() : "";
    const description = task.description ? task.description.toLowerCase() : "";
    const status = task.status ? task.status.toLowerCase() : "";
    const date = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "";
  
    return (
      title.includes(query) ||
      description.includes(query) ||
      status.includes(query) ||
      date.includes(query)
    );
  });

  return (
    <div className="dashboard-container">
        <h2>DASHBOARD</h2>
        
      <main className="dashboard-main">
        {/* <TaskForm fetchTasks={fetchTasks} /> */}
        <div className="header">
          <button className="addTask" onClick={() => setShowTaskForm(true)}>Add Task</button>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        {/* Task Form (conditionally rendered) */}
        {showTaskForm && (
            <TaskForm
              fetchTasks={fetchTasks}
              onClose={() => setShowTaskForm(false)}
            />
        )}
        <TaskList tasks={filteredTasks} fetchTasks={fetchTasks} />
      </main>
    </div>
  );
};

export default Dashboard;