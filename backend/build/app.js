"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cors_1 = __importDefault(require("cors"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
// import { UserWithId } from "./models/userModel";
const app = (0, express_1.default)();
// declare module "express-serve-static-core" {
//   interface Request {
//     user?: UserWithId | null;
//   }
// }
mongoose_1.default
    .connect(config_1.config.mongo.url, { w: "majority", retryWrites: true })
    .then(() => {
    // NOTE Start server if DB is connected
    startServer();
    console.log("DB Connected");
})
    .catch((error) => {
    console.log(error);
});
const startServer = () => {
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use((0, cookie_parser_1.default)());
    app.use("/api/users", userRoutes_1.default);
    app.use(errorMiddleware_1.notFound);
    app.use(errorMiddleware_1.errorHandler);
};
exports.default = app;
