import { Exception } from "@core/exceptions/Exception";
import { Request, Response, NextFunction } from "express";

export interface ExceptionHandler<E extends Exception = Exception> {
  handle(exception: E, req: Request, res: Response, next: NextFunction): void;
}
