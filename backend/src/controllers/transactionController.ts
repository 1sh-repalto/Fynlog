import { Request, Response, NextFunction } from "express";
import { AppError } from "../middlewares/errorHandler";
import Transaction from "../models/transaction";

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
    const { period } = req.query;
    const userId = req.user.id;

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
        $gte: startDate,
        $lte: now,
      };
    }

    const transactions = await Transaction.findAll({
      where,
      order: [['date', 'DESC']],
    });

    res.status(200).json(transactions);
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
