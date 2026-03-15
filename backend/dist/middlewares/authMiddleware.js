"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("./errorHandler");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const JWT_SECRET = env_1.env.JWT_ACCESS_SECRET;
const authMiddleware = async (req, _res, next) => {
    const token = req.cookies?.accessToken;
    if (!token) {
        return next(new errorHandler_1.AppError("No token provided", 401));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        next(new errorHandler_1.AppError("Unauthorized: Invalid token", 401));
    }
};
exports.default = authMiddleware;
