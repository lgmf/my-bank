import { Request, Response } from "express";

import { ValidationException } from "@core/exceptions/ValidationException";

import { ExceptionHandler } from "./ExceptionHandler";

export class ValidationExceptionHandler implements ExceptionHandler<ValidationException> {
  handle(exception: ValidationException, req: Request, res: Response): void {
    const { message } = exception as ValidationException;
    res.status(400).json({ message });
  }
}
