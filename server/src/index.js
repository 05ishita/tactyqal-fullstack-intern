import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import postRoutes from "./routes/postRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));
app.get("/api/health", (req, res) => res.json({ success: true, message: "Tactyqal Blog API is running", database: mongoose.connection.readyState === 1 ? "connected" : "disconnected" }));
app.use("/api/posts", postRoutes);
app.use(notFound);
app.use(errorHandler);

async function start() {
  try {
    if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is missing. Add it to server/.env");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
}
start();
