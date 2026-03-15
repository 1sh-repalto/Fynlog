"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBudget = exports.getBudgetsForMonth = exports.createBudget = void 0;
const errorHandler_1 = require("../middlewares/errorHandler");
const budget_1 = __importDefault(require("../models/budget"));
const createBudget = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new errorHandler_1.AppError("Unauthorized", 401);
        }
        const { categoryId, amount } = req.body;
        const userId = req.user.userId;
        const now = new Date();
        const month = `${now.getFullYear()}-${(now.getMonth() + 1)
            .toString()
            .padStart(2, "0")}`;
        const existing = await budget_1.default.findOne({
            where: { userId, categoryId, month },
        });
        if (existing) {
            throw new errorHandler_1.AppError("Budget for this category already exists", 400);
        }
        const budget = await budget_1.default.create({ userId, categoryId, amount, month });
        res.status(201).json(budget);
    }
    catch (error) {
        next(error);
    }
};
exports.createBudget = createBudget;
const getBudgetsForMonth = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new errorHandler_1.AppError("Unauthorized", 401);
        }
        const userId = req.user.userId;
        const now = new Date();
        const month = `${now.getFullYear()}-${(now.getMonth() + 1)
            .toString()
            .padStart(2, "0")}`;
        const budgets = await budget_1.default.findAll({ where: { userId, month } });
        res.json(budgets);
    }
    catch (error) {
        next(error);
    }
};
exports.getBudgetsForMonth = getBudgetsForMonth;
const deleteBudget = async (req, res, next) => {
    const { id } = req.params;
    try {
        const budget = await budget_1.default.findByPk(id);
        if (!budget) {
            return next(new errorHandler_1.AppError("Budget not found", 404));
        }
        if (budget.userId !== req.user?.userId) {
            return next(new errorHandler_1.AppError("Unauthorized to delete this budget", 403));
        }
        await budget.destroy();
        res.status(204).send(); // No content
    }
    catch (error) {
        next(error);
    }
};
exports.deleteBudget = deleteBudget;
