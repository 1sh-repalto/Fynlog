import jwt from "jsonwebtoken";
import { env } from "../config/env";

const ACCESS_SECRET = env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = env.JWT_REFRESH_SECRET;

interface Payload {
  userId: number;
  email: string;
}

export const generateAccessToken = (userId: number, email: string) => {
  return jwt.sign({ userId, email }, ACCESS_SECRET, { expiresIn: "15m" });
}

export const generateRefreshToken = (userId: number, email: string) => {
  return jwt.sign({ userId, email }, REFRESH_SECRET, { expiresIn: "7d" });
}

export const verifyRefreshToken = (token: string): Payload | null => {
  try {
    return jwt.verify(token, REFRESH_SECRET) as Payload;
  } catch (error) {
    return null;
  }
}