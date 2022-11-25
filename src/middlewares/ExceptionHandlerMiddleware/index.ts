import { ErrorRequestHandler } from "express";

import { Exception, ExceptionTypes } from "@core/exceptions/Exception";

import { ExceptionHandler } from "./ExceptionHandler";
import { HttpExceptionHandler } from "./HttpExceptionHandler";
import { ValidationExceptionHandler } from "./ValidationExceptionHandler";
import { UnknownExceptionHandler } from "./UnknownException";

const exceptionHandlersByType: Record<ExceptionTypes, ExceptionHandler> = {
  http: new HttpExceptionHandler(),
  validation: new ValidationExceptionHandler(),
  unknown: new UnknownExceptionHandler()
}

const exceptionHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const exception = err as Exception;
  const type = exception.type || "unknown";
  const exceptionHandler = exceptionHandlersByType[type];

  exceptionHandler.handle(exception, req, res, next);
}

export default exceptionHandlerMiddleware;
