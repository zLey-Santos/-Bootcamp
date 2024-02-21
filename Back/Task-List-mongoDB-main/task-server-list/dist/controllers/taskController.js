"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskService_1 = require("../services/taskService");
const db_1 = require("../db");
const router = (0, express_1.Router)();
const db = (0, db_1.connectDb)();
const taskService = new taskService_1.TaskService(db);
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield taskService.getAllTasks();
    res.json(tasks);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield taskService.getTaskById(req.params.id);
    res.json(task);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const newTask = yield taskService.createTask(title);
    res.json(newTask);
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const updatedTask = yield taskService.updateTask(req.params.id, title);
    res.json(updatedTask);
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const success = yield taskService.deleteTask(req.params.id);
    res.json({ success });
}));
exports.default = router;
