"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const taskController_1 = __importDefault(require("./controllers/taskController"));
const db_1 = require("./db"); // Certifique-se de ajustar o caminho correto
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3001",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204
}));
app.use(express_1.default.json());
const db = (0, db_1.connectDb)();
app.use("/tasks", taskController_1.default);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor está ouvindo na porta [${port}]`);
});
