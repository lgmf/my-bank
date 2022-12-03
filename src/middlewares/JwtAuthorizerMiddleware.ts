import { Request, Response, NextFunction } from "express";

import { JwtAuthorizer, JwtPayload } from "@core/authorizer/JwtAuthorizer";
import { UnauthorizedHttpException } from "@core/exceptions/HttpException";

const jwtAuthorizer = new JwtAuthorizer();

function jwtAuthorizerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new UnauthorizedHttpException("Missing authorization header");
  }

  try {
    const [, token] = authorization.split(" ");
    const jwtPayload = jwtAuthorizer.verifyToken<JwtPayload>(token);

    req.context.set("token", token);
    req.context.set("userId", jwtPayload.user.id);

    next();
  } catch (error) {
    let message = "invalid token";

    if (error instanceof Error) {
      message = error.message;
    }

    throw new UnauthorizedHttpException(message);
  }
}

export default jwtAuthorizerMiddleware;
