"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let db;
const connectDb = () => {
    if (db) {
        return db;
    }
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/task_server_list";
    mongoose_1.default.connect(mongoURI);
    db = mongoose_1.default.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    return db;
};
exports.connectDb = connectDb;
