import { Request, Response, NextFunction } from "express";
import { AppError } from "./errorHandler";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

const JWT_SECRET = env.JWT_ACCESS_SECRET!;

export interface JwtPayload {
  userId: number;
  email: string;
}

export interface AuthenticatedRequest<
  Params = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any
> extends Request<Params, ResBody, ReqBody, ReqQuery> {
  user?: JwtPayload;
}

const authMiddleware = async (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken;
    
    if(!token) {
        return next(new AppError("No token provided", 401));
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