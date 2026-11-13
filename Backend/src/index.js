import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config();

import { connectDB } from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "ToDo API is healthy and operational." });
});

app.use("/api/tasks", taskRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found." });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
