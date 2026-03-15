"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getAllUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const errorHandler_1 = require("../middlewares/errorHandler");
const getAllUsers = async (_req, res, next) => {
    try {
        const users = await user_1.default.findAll({
            attributes: ["id", "name", "email", "createdAt"],
        });
        res.status(200).json({ message: "Showing all users:", users });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUsers = getAllUsers;
const deleteUser = async (req, // from authMiddleware
res, next) => {
    const { id } = req.params;
    try {
        if (!req.user || req.user.userId !== parseInt(id)) {
            throw new errorHandler_1.AppError("Unauthorized to delete this user.", 403);
        }
        const user = await user_1.default.findByPk(id);
        if (!user) {
            throw new errorHandler_1.AppError("No user exists with this id.", 404);
        }
        await user.destroy();
        res.status(200).json({ message: "User deleted successfully." });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
