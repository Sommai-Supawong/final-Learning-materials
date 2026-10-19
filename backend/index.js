import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import learningResourceRouter from "./router/learningResourceRouter.js";
import { seedLearningResources } from "./config/seedData.js";

// .env อยู่ข้างนอก
dotenv.config();

// Dynamically bind to PORT, BACKEND_PORT, or fallback to 5000
const PORT = process.env.PORT || process.env.BACKEND_PORT || 5000;

const app = express();

// Flexible CORS: Allow specific origins from env (CORS_ORIGIN) or allow all by default
const allowedOrigins =
  process.env.CORS_ORIGIN && process.env.CORS_ORIGIN.trim() !== "*"
    ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
    : "*";

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Connect to Database and Seed Learning Resources
const initApp = async () => {
  await connectDB();
  await seedLearningResources();
};
initApp();

// Root & Health Check Endpoints (for Render, Docker, and status monitors)
app.get("/", (req, res) => {
  return res.status(200).send("<h1>Learning Resource Management API is running</h1>");
});

app.get("/health", (req, res) => {
  return res.status(200).json({
    status: "ok",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
  });
});

app.get("/api/health", (req, res) => {
  return res.status(200).json({
    status: "ok",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
  });
});

// Topic 5: สื่อการเรียนรู้ (Learning Resources)
app.use("/api/learning-resources", learningResourceRouter);
app.use("/learning-resources", learningResourceRouter);

// Global JSON Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Unhandled API Error:", err);
  return res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on: http://0.0.0.0:${PORT}`);
});
