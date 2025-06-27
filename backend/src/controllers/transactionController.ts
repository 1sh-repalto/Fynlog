import { Request, Response, NextFunction } from "express";
import { AppError } from "../middlewares/errorHandler";
import Transaction from "../models/transaction";
import { Op } from "sequelize";

interface AuthenticatedRequest extends Request {
  user?: { userId: number; email: string; iat: number; exp: number };
}

export const createTransaction = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const userId = req.user.userId;
    let { categoryId, amount, type, description } = req.body;
    
    const transaction = await Transaction.create({
      userId,
      categoryId,
      amount,
      type,
      date: new Date(),
      description,
    });

    res.status(201).json({ transaction });
  } catch (error) {
    next(error);
  }
};

export const getAllTransactions = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const userId = req.user.userId;
    const transactions = await Transaction.findAll({
      where: { userId },
      order: [["date", "DESC"]],
    });
    
    res.status(200).json({ transactions });
  } catch (error) {
    next(error);
  }
};

export const getMonthlyTransactions = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }
    
    const userId = req.user.userId;
    const { month } = req.query;

    if(!month || typeof month !== "string") {
      throw new AppError("Month parameter is required in YYYY-MM format", 400);
    }

    const [year, mon] = month.split("-").map(Number);
    const startDate = new Date(year, mon-1, 1);
    const endDate = new Date(year, mon, 0, 23, 59, 59);

    const transactions = await Transaction.findAll({
      where: {
        userId,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      order: [["date", "DESC"]],
    });

    res.status(200).json({ transactions });
  } catch (error) {
    next(error);
  }
}

export const getPaginatedTransactions = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const userId = req.user.userId;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    const { rows: transactions, count } = await Transaction.findAndCountAll({
      where: { userId },
      order: [["date", "DESC"]],
      limit,
      offset,
    });

    res.status(200).json({
      transactions,
      total: count,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTransaction = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const transactionId = Number(req.params.id);
    const userId = req.user?.userId;

    if (!transactionId || isNaN(transactionId)) {
      throw new AppError('Invalid transaction ID', 400);
    }

    if (!userId) {
      throw new AppError('Unauthorized', 401);
    }

    const transaction = await Transaction.findOne({
      where: { id: transactionId },
    });

    if (!transaction || transaction.userId !== userId) {
      throw new AppError('Transaction not found or unauthorized', 404);
    }

    await Transaction.destroy({
      where: { id: transactionId },
    });

    res.status(204).send(); // No content
  } catch (err) {
    next(err);
  }
};
