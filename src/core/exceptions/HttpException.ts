import { Exception } from "./Exception";

export class HttpException extends Exception {
  constructor(public message: string, public status: number) {
    super(message, "http");
  }
}

export class BadRequestHttpException extends HttpException {
  constructor(public message: string) {
    super(message, 400);
  }
}

export class NotFoundHttpException extends HttpException {
  constructor(public message: string) {
    super(message, 404);
  }
}

export class UnauthorizedHttpException extends HttpException {
  constructor(public message: string) {
    super(message, 401);
  }
}

export class InternalServerHttpException extends HttpException {
  constructor(public message: string) {
    super(message, 500);
  }
}
