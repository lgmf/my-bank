import { Exception } from "./Exception";

export class ValidationException extends Exception {
  constructor(public message: string) {
    super(message, "validation");
  }
}
