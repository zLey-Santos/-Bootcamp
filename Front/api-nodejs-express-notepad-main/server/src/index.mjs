import "express-async-errors";
import express from "express";
import cors from "cors";
import { ZodError } from "zod";
import { notepadController } from "./notepad/notepad.controller.mjs";

const port = 8080;
const host = "localhost";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

function handleErrorMiddlewar(err, req, res, next) {
  if (err instanceof ZodError) {
    console.log(err);
    return res.status(422).json(err);
  }
  next();
}

app.use(express.json());
app.use(handleErrorMiddlewar);
app.use("/notepads", notepadController);

app.listen(port, host, () => {
  console.log(`Servidor inicializado em http://${host}:${port}`);
});
