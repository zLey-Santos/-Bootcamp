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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
// taskService.ts
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("../db");
const taskSchema = new mongoose_1.default.Schema({
    title: String
}, { timestamps: true });
const TaskModel = mongoose_1.default.model("Task", taskSchema);
class TaskService {
    constructor(db) {
        this.db = db;
    }
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, db_1.connectDb)();
            const tasks = yield TaskModel.find().lean();
            return tasks;
        });
    }
    getTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, db_1.connectDb)();
            const task = yield TaskModel.findById(id);
            return task;
        });
    }
    createTask(title) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, db_1.connectDb)();
            const newTask = yield TaskModel.create({ title });
            return newTask;
        });
    }
    updateTask(id, title) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, db_1.connectDb)();
            const updatedTask = yield TaskModel.findByIdAndUpdate(id, { title }, { new: true });
            return updatedTask;
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, db_1.connectDb)();
            const result = yield TaskModel.findByIdAndDelete(id);
            return !!result;
        });
    }
}
exports.TaskService = TaskService;
