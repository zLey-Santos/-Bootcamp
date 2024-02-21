import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import taskRoutes from "./controllers/taskController";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/task_server_list";

mongoose.connect(mongoURI);

app.use("/tasks", taskRoutes);

export default app;
