import express from "express";
import cors from "cors";
import taskRoutes from "./controllers/taskController";
import { connectDb } from "./db"; // Certifique-se de ajustar o caminho correto

const app = express();
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204
  })
);
app.use(express.json());

const db = connectDb();

app.use("/tasks", taskRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta [${port}]`);
});
