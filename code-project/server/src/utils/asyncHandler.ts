
import { Request, Response, NextFunction } from 'express';

// Simplified asyncHandler that works with any request type
export const asyncHandler = (
  fn: (req: any, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};