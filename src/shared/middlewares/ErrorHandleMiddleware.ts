import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export default class ErrorHandleMiddleware {
  public static handleError(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        type: 'error',
        message: error.message,
      });
    }

    res.status(500).json({
      type: 'error',
      message: 'Internal server error',
    });
  }
}
