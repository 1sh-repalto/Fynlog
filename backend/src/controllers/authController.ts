import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import { AppError } from "../middlewares/errorHandler";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
};

interface RefreshRequest extends Request {
  cookies: { refreshToken?: string }; // Define cookies structure
}

// Sign Up
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ where: { email } });

    if (existing) throw new AppError("Email already in use", 409);

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const accessToken = generateAccessToken(user.id, user.email);
    const refreshToken = generateRefreshToken(user.id, user.email);

    res
      .cookie("accessToken", accessToken, {
        ...COOKIE_OPTIONS,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ id: user.id, name, email });
  } catch (err) {
    next(err);
  }
};

// Login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError("Invalid credentials", 401);
    }

    const accessToken = generateAccessToken(user.id, user.email);
    const refreshToken = generateRefreshToken(user.id, user.email);

    res
      .cookie("accessToken", accessToken, {
        ...COOKIE_OPTIONS,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    next(err);
  }
};

// Refresh Token
export const refreshToken = async (
  req: RefreshRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      res.status(403).json({ message: "No refresh token" });
      return;
    }

    const payload = verifyRefreshToken(token);
    if (!payload) throw new AppError("Invalid refresh token", 403);

    const newAccessToken = generateAccessToken(payload.userId, payload.email);
    res.cookie("accessToken", newAccessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 15 * 60 * 1000,
    });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

// Validate
export const validate = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const user = await User.findOne({
    where: { id: req.user!.userId },
    attributes: ["id", "name", "email"], // select only required fields
  });

  if (!user) {
    throw new AppError("User not found while validating", 401);
  }
  res.status(200).json(user);
};

// Logout
export const logout = async (_: Request, res: Response): Promise<void> => {
  res
    .clearCookie("accessToken", COOKIE_OPTIONS)
    .clearCookie("refreshToken", COOKIE_OPTIONS)
    .sendStatus(200);
};
