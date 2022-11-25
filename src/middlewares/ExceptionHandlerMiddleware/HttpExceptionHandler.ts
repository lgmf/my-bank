import { Request, Response } from "express";

import { HttpException } from "@core/exceptions/HttpException";

import { ExceptionHandler } from "./ExceptionHandler";

export class HttpExceptionHandler implements ExceptionHandler<HttpException> {
  handle(exception: HttpException, req: Request, res: Response): void {
    const { status, message } = exception;
    res.status(status).json({ message });
  }
}
