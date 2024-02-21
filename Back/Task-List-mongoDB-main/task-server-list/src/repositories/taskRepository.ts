import TaskModel, { TaskModel as TaskModelType } from "../models/taskModel";

export class TaskRepository {
  async getAllTasks(): Promise<TaskModelType[]> {
    return TaskModel.find();
  }

  async getTaskById(id: string): Promise<TaskModelType | null> {
    return TaskModel.findById(id);
  }

  async createTask(title: string): Promise<TaskModelType> {
    return TaskModel.create({ title });
  }

  async updateTask(id: string, title: string): Promise<TaskModelType | null> {
    return TaskModel.findByIdAndUpdate(id, { title }, { new: true });
  }

  async deleteTask(id: string): Promise<boolean> {
    const result = await TaskModel.findByIdAndDelete(id);
    return result !== null;
  }
}
