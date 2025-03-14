const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const protect = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors({ origin: "https://taskmanager-frontend-9n8s.onrender.com", credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", protect, taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
