import mongoose, { Connection } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let db: Connection;

export const connectDb = () => {
  if (db) {
    return db;
  }

  const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/task_server_list";
  mongoose.connect(mongoURI);

  db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  return db;
};
