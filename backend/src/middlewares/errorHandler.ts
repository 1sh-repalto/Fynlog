import { Request, Response, NextFunction } from "express";

class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);

    let statusCode = 500;
    let message = "Internal Server Error";

    if(err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    res.status(statusCode).json({ success: false, message });
};

export { AppError, errorHandler };