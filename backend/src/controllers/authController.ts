import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

// register user
export const authRegister = async (req: Request, res: Response): Promise<any> => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully.", newUser });
    
  } catch (error) {
    return res.status(400).json({ message: "Error registering user.", error });
  }
};

// login user
export const authLogin = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .json({ message: "No user exists with this email." });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in", error });
  }
};
