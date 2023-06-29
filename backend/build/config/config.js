"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const USERNAME = process.env.DB_USERNAME || "";
const PASSWORD = process.env.DB_PASSWORD || "";
const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@novidb.m1np26v.mongodb.net`;
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
exports.config = {
    mongo: { url: URL },
    server: { port: PORT },
};
