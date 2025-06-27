import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { AppError } from "../middlewares/errorHandler";
import Budget from "../models/budget";

export const createBudget = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }
    const { categoryId, amount } = req.body;
    const userId = req.user.userId;
    const now = new Date();
    const month = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    const existing = await Budget.findOne({
      where: { userId, categoryId, month },
    });
    if (existing) {
      throw new AppError(
        "Budget for this category already exists",
        400
      );
    }

    const budget = await Budget.create({ userId, categoryId, amount, month });
    res.status(201).json(budget);
  } catch (error) {
    next(error);
  }
};

export const getBudgetsForMonth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }
    const userId = req.user.userId;
    const now = new Date();
    const month = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    const budgets = await Budget.findAll({ where: { userId, month } });
    res.json(budgets);
  } catch (error) {
    next(error);
  }
};

export const deleteBudget = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const budget = await Budget.findByPk(id);

    if (!budget) {
      return next(new AppError("Budget not found", 404));
    }

    if (budget.userId !== req.user?.userId) {
      return next(new AppError("Unauthorized to delete this budget", 403));
    }

    await budget.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    next(error);
  }
};

