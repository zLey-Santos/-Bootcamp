import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import notepadRoutes from "./routes/notepadRoutes";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/notepadDB");

app.use("/notepads", notepadRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
