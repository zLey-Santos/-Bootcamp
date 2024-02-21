// taskService.ts
import mongoose, { Document, Schema, Connection, Types } from "mongoose";
import { connectDb } from "../db";

export interface Task {
  _id: Types.ObjectId;
  title: string;
}

const taskSchema = new mongoose.Schema<Task>(
  {
    title: String
  },
  { timestamps: true }
);

const TaskModel = mongoose.model<Task>("Task", taskSchema);

export class TaskService {
  private db: Connection;

  constructor(db: Connection) {
    this.db = db;
  }

  async getAllTasks(): Promise<Task[]> {
    await connectDb();
    const tasks: Task[] = await TaskModel.find().lean();
    return tasks;
  }

  async getTaskById(id: string): Promise<Task | null> {
    await connectDb();
    const task = await TaskModel.findById(id);
    return task;
  }

  async createTask(title: string): Promise<Task> {
    await connectDb();
    const newTask = await TaskModel.create({ title });
    return newTask;
  }

  async updateTask(id: string, title: string): Promise<Task | null> {
    await connectDb();
    const updatedTask = await TaskModel.findByIdAndUpdate(id, { title }, { new: true });
    return updatedTask;
  }

  async deleteTask(id: string): Promise<boolean> {
    await connectDb();
    const result = await TaskModel.findByIdAndDelete(id);
    return !!result;
  }
}
