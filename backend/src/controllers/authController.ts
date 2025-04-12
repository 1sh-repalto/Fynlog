import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { AppError } from "../middlewares/errorHandler";
import { ensureDefaultCategory } from "../helper/categoryService";

dotenv.config();

const ACCESS_TOKEN_EXPIRY = "15m";
const JWT_SECRET = process.env.JWT_SECRET!;

interface AuthRequest extends Request {
  cookies: { accessToken?: string }; // Define cookies structure
}

const generateToken = (user: { id: number; email: string; name: string }) => {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
};

// register user
export const authSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new AppError("A user already exists with this email.", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    await ensureDefaultCategory(newUser.id);
    const accessToken = generateToken(newUser);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 min
    });

    res
      .status(201)
      .json({ id: newUser.id, email: newUser.email, name: newUser.name });
  } catch (error) {
    next(error);
  }
};

// login user
export const authLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new AppError("No user exists with this email.", 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Invalid Password", 401);
    }

    const accessToken = generateToken(user);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 min
    });

    res.status(200).json({ id: user.id, email: user.email, name: user.name });
  } catch (error) {
    next(error);
  }
};

// validate user session
export const validateCookie = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(200).json(null);
    }

    jwt.verify(token, JWT_SECRET as string, (err, decoded) => {
      if (err) {
        throw new AppError("Invalid token", 403);
      }

      const user = decoded as JwtPayload;
      res.json({ id: user.id, email: user.email, name: user.name });
    });
  } catch (error) {
    next(error);
  }
};

// logout user
export const authLogout = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};
