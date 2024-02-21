import mongoose, { Schema, Document } from "mongoose";

export interface TaskModel extends Document {
  title: string;
}

const taskSchema = new Schema({
  title: { type: String, required: true }
});

export default mongoose.model<TaskModel>("Task", taskSchema);
