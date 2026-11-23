import type {Request, Response, NextFunction} from 'express';
import AppError from '../utils/app.error.js';

export const errorMiddleware = (
    err: Error,
    req:Request,
    res:Response,
    next:NextFunction
): void=>{
    const statusCode = err instanceof AppError ? err.statusCode : 500;
    const message = err instanceof AppError ? err.message: "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        error: message
    });
}