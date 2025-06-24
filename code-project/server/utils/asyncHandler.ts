// utils/asyncHandler.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';

export const asyncHandler = <
  Req extends Request = Request,
  Res extends Response = Response
>(
  fn: (req: Req, res: Res, next: NextFunction) => Promise<void>
): RequestHandler => {
  return (req, res, next) => {
    fn(req as Req, res as Res, next).catch(next);
  };
};
