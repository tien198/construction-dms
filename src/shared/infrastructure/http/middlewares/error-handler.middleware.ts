import { Request, Response, NextFunction } from 'express';
import { DomainError } from '../../../domain/errors/domain.error';
import { NotFoundError } from '../../../domain/errors/not-found.error';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  if (err instanceof NotFoundError) {
    res.status(404).json({
      code: err.code,
      message: err.message,
      timestamp: err.timestamp,
    });
    return;
  }

  if (err instanceof DomainError) {
    res.status(400).json({
      code: err.code,
      message: err.message,
      timestamp: err.timestamp,
    });
    return;
  }

  console.error('[UnhandledError]', err);
  res.status(500).json({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred',
    timestamp: new Date(),
  });
}
