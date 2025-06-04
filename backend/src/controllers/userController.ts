import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import { AppError } from "../middlewares/errorHandler";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await User.findAll();
    res.status(200).json({ message: "Showing all users: ", users });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new AppError("No user exists with this id.", 404);
    }
    user.destroy();
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    next(error);
  }
};
