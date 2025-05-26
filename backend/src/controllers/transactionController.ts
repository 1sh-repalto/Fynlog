import { Request, Response, NextFunction } from "express";
import { AppError } from "../middlewares/errorHandler";
import Transaction from "../models/transaction";
import { Op } from "sequelize";

interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string; iat: number; exp: number };
}

export const getTransactions = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const { period, limit = "10", offset = "0" } = req.query;
    const userId = req.user.id;

    const parsedLimit = parseInt(limit as string);
    const parsedOffset = parseInt(offset as string); // ✅ Fixed here

    let startDate;
    const now = new Date();

    if (period == "weekly") {
      startDate = new Date(now);
      startDate.setDate(now.getDate() - now.getDay());
    } else if (period === "monthly") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (period === "yearly") {
      startDate = new Date(now.getFullYear(), 0, 1);
    }

    const where: any = { userId };
    if (startDate) {
      where.date = {
        [Op.gte]: startDate,
        [Op.lte]: now,
      };
    }

    const { rows: transactions, count } = await Transaction.findAndCountAll({
      where,
      order: [["date", "DESC"]],
      limit: parsedLimit,
      offset: parsedOffset,
    });

    res.status(200).json({
      transactions,
      total: count,
    });
  } catch (error) {
    next(error);
  }
};


export const createTransaction = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const userId = req.user.id;
    let { categoryId, amount, type, description } = req.body;

    const transaction = await Transaction.create({
      userId,
      categoryId,
      amount,
      type,
      date: new Date(),
      description,
    });

    res
      .status(201)
      .json({ message: "Transaction created successfully", transaction });
  } catch (error) {
    next(error);
  }
};
