import { Request, Response, NextFunction } from "express";

export function requestContextMiddleware(req: Request, res: Response, next: NextFunction) {
  req.context = new Map();
  next();
}
