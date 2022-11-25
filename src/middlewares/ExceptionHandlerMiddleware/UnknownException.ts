import { Request, Response } from "express";

import { Exception } from "@core/exceptions/Exception";

import { ExceptionHandler } from "./ExceptionHandler";

export class UnknownExceptionHandler implements ExceptionHandler {
  handle(exception: Exception, req: Request, res: Response): void {
    const message = exception.message || "Something went wrong";
    res.status(500).json({ message });
  }
}
