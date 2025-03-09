import { Request, Response } from "express";
import User from "../models/user";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const users = await User.findAll();
    return res.status(200).json({ message: "Showing all users: ", users });
  } catch (error) {
    res.status(500).json({ message: "Cannot get all users." });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }

    user.destroy();
    return res.status(200).json({ message: "User deleted successfully." });

  } catch (error) {
    res.status(500).json({ message: "Error deleting user." });
  }

  res.status(200).json({ message: "User deleted successfully.", id });
};
