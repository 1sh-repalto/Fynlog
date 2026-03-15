"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = void 0;
const env_1 = require("../config/env");
const sequelize_1 = require("sequelize");
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.AppError = AppError;
const errorHandler = (err, req, res, next) => {
    console.error(err);
    let statusCode = 500;
    let message = "Internal Server Error";
    if (err instanceof sequelize_1.ValidationError) {
        statusCode = 400;
        message = err.errors[0]?.message || "Validation error";
    }
    else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    if (env_1.env.NODE_ENV === "development") {
        res.status(statusCode).json({ success: false, message, stack: err.stack });
    }
    else {
        res.status(statusCode).json({ success: false, message });
    }
};
exports.errorHandler = errorHandler;
