import { Router, Request, Response } from "express";
import { TaskService } from "../services/taskService";
import { connectDb } from "../db";

const router = Router();
const db = connectDb();
const taskService = new TaskService(db);

router.get("/", async (req: Request, res: Response) => {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
});

router.get("/:id", async (req: Request, res: Response) => {
  const task = await taskService.getTaskById(req.params.id);
  res.json(task);
});

router.post("/", async (req: Request, res: Response) => {
  const { title } = req.body;
  const newTask = await taskService.createTask(title);
  res.json(newTask);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { title } = req.body;
  const updatedTask = await taskService.updateTask(req.params.id, title);
  res.json(updatedTask);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const success = await taskService.deleteTask(req.params.id);
  res.json({ success });
});

export default router;
