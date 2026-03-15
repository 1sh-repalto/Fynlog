"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.getPaginatedTransactions = exports.getMonthlyTransactions = exports.getAllTransactions = exports.createTransaction = void 0;
const errorHandler_1 = require("../middlewares/errorHandler");
const transaction_1 = __importDefault(require("../models/transaction"));
const sequelize_1 = require("sequelize");
const createTransaction = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new errorHandler_1.AppError("Unauthorized", 401);
        }
        const userId = req.user.userId;
        let { categoryId, amount, type, description } = req.body;
        const transaction = await transaction_1.default.create({
            userId,
            categoryId,
            amount,
            type,
            date: new Date(),
            description,
        });
        res.status(201).json({ transaction });
    }
    catch (error) {
        next(error);
    }
};
exports.createTransaction = createTransaction;
const getAllTransactions = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new errorHandler_1.AppError("Unauthorized", 401);
        }
        const userId = req.user.userId;
        const transactions = await transaction_1.default.findAll({
            where: { userId },
            order: [["date", "DESC"]],
        });
        res.status(200).json({ transactions });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllTransactions = getAllTransactions;
const getMonthlyTransactions = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new errorHandler_1.AppError("Unauthorized", 401);
        }
        const userId = req.user.userId;
        const { month } = req.query;
        if (!month || typeof month !== "string") {
            throw new errorHandler_1.AppError("Month parameter is required in YYYY-MM format", 400);
        }
        const [year, mon] = month.split("-").map(Number);
        const startDate = new Date(year, mon - 1, 1);
        const endDate = new Date(year, mon, 0, 23, 59, 59);
        const transactions = await transaction_1.default.findAll({
            where: {
                userId,
                date: {
                    [sequelize_1.Op.between]: [startDate, endDate],
                },
            },
            order: [["date", "DESC"]],
        });
        res.status(200).json({ transactions });
    }
    catch (error) {
        next(error);
    }
};
exports.getMonthlyTransactions = getMonthlyTransactions;
const getPaginatedTransactions = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new errorHandler_1.AppError("Unauthorized", 401);
        }
        const userId = req.user.userId;
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        const { rows: transactions, count } = await transaction_1.default.findAndCountAll({
            where: { userId },
            order: [["date", "DESC"]],
            limit,
            offset,
        });
        res.status(200).json({
            transactions,
            total: count,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getPaginatedTransactions = getPaginatedTransactions;
const deleteTransaction = async (req, res, next) => {
    try {
        const transactionId = Number(req.params.id);
        const userId = req.user?.userId;
        if (!transactionId || isNaN(transactionId)) {
            throw new errorHandler_1.AppError('Invalid transaction ID', 400);
        }
        if (!userId) {
            throw new errorHandler_1.AppError('Unauthorized', 401);
        }
        const transaction = await transaction_1.default.findOne({
            where: { id: transactionId },
        });
        if (!transaction || transaction.userId !== userId) {
            throw new errorHandler_1.AppError('Transaction not found or unauthorized', 404);
        }
        await transaction_1.default.destroy({
            where: { id: transactionId },
        });
        res.status(204).send(); // No content
    }
    catch (err) {
        next(err);
    }
};
exports.deleteTransaction = deleteTransaction;
