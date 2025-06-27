import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import { AppError } from "../middlewares/errorHandler";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "createdAt"],
    });

    res.status(200).json({ message: "Showing all users:", users });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: AuthenticatedRequest, // from authMiddleware
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    if (!req.user || req.user.userId !== parseInt(id)) {
      throw new AppError("Unauthorized to delete this user.", 403);
    }

    const user = await User.findByPk(id);
    if (!user) {
      throw new AppError("No user exists with this id.", 404);
    }

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    next(error);
  }
};

