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

    const userId = req.user.id;

    const allTransactions = await Transaction.findAll({ where: { userId } });

    res.status(200).json(allTransactions);
  } catch (error) {
    next(error);
  }
};

export const createTransaction = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if(!req.user) {
        throw new AppError("Unauthorized", 401);
    }

    const userId = req.user.id;
    const { categoryId, amount, type, description } = req.body;

    const transaction = await Transaction.create({
      userId,
      categoryId,
      amount,
      type,
      date: new Date(),
      description,
    });

    res.status(201).json({ message: "Transaction created successfully", transaction });

  } catch (error) {
    next(error);
  }
};
