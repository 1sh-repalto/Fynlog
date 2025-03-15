import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

interface AuthRequest extends Request {
  cookies: { accessToken?: string }; // Define cookies structure
}

// register user
export const authRegister = async (
  req: Request,
  res: Response
): Promise<any> => {
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

    const accessToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.json({ id: user.id, email: user.email });

  } catch (error) {
    return res.status(500).json({ message: "Error logging in", error });
  }
};

export const validateCookie = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  try {
    const token = req.cookies?.accessToken;
    
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    
    jwt.verify(token, JWT_SECRET as string, (err, decoded) => {
      if(err) return res.status(403).json({ message: "Invalid token" });

      const user = decoded as JwtPayload;

      res.json({ id: user.id, email: user.email });
    });

  } catch (error) {
    console.log("Token validation failed.", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout failed:", error);
    res.status(500).json({ message: "logout failed", error });
  }
};
