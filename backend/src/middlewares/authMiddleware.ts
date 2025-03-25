import { Request, Response, NextFunction } from "express";
import { AppError } from "./errorHandler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

interface JwtPayload {
    userId: number;
    email: string;
}

interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;

    if(!token) {
        return next(new AppError("No token provided", 404));
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        next(new AppError("Unauthorized: Invalid token", 401));
    }
}

export default authMiddleware;